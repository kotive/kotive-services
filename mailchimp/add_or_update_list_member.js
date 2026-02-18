'use strict';

const crypto = require('crypto');
const https = require('https');

/**
 * Creates a standardised error response object.
 *
 * @param {string} message  - Human-readable error description
 * @param {number} [status] - HTTP status code (0 for non-HTTP errors)
 * @param {string} [code]   - Machine-readable error code
 * @param {*}      [detail] - Additional context (API response body, etc.)
 * @returns {{ success: false, error: { message: string, status: number, code: string, detail: * } }}
 */
function createError(message, status, code, detail) {
    return {
        success: false,
        error: {
            message: message,
            status: status || 0,
            code: code || 'UNKNOWN_ERROR',
            detail: detail || null
        }
    };
}

/**
 * Returns the MD5 hex-digest of a lowercased string (used for Mailchimp subscriber hashes).
 *
 * @param {string} value
 * @returns {string}
 */
function md5(value) {
    return crypto.createHash('md5').update(value.toLowerCase().trim()).digest('hex');
}

/**
 * Sends an HTTPS request and resolves with { statusCode, headers, body }.
 *
 * @param {object} options          - Node.js https.request options
 * @param {string|Buffer} [payload] - Optional request body
 * @returns {Promise<{ statusCode: number, headers: object, body: * }>}
 */
function request(options, payload) {
    return new Promise(function (resolve, reject) {
        var req = https.request(options, function (res) {
            var chunks = [];
            res.on('data', function (chunk) { chunks.push(chunk); });
            res.on('end', function () {
                var raw = Buffer.concat(chunks).toString('utf8');
                var body;
                try { body = JSON.parse(raw); } catch (e) { body = raw; }
                resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
            });
        });
        req.on('error', reject);
        if (payload) { req.write(payload); }
        req.end();
    });
}

/**
 * Builds common HTTPS request options for the Mailchimp API.
 *
 * @param {object} auth   - Auth object with auth.field.apikey and auth.field.district
 * @param {string} method - HTTP method
 * @param {string} path   - URL path (starting with /)
 * @returns {object}
 */
function buildRequestOptions(auth, method, path) {
    var token = Buffer.from('anystring:' + auth.field.apikey).toString('base64');
    return {
        hostname: auth.field.district + '.api.mailchimp.com',
        port: 443,
        path: '/3.0' + path,
        method: method,
        headers: {
            'Authorization': 'Basic ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
}

/**
 * Parses a JSON-like string value into an object.
 * Returns the original value if it is already an object or if parsing fails.
 *
 * @param {*} value
 * @returns {object}
 */
function parseJsonField(value) {
    if (value && typeof value === 'string') {
        try { return JSON.parse(value); } catch (e) { return {}; }
    }
    return (typeof value === 'object' && value !== null) ? value : {};
}

/**
 * Executes the "Add or update a list member" action against the Mailchimp API.
 *
 * The function first checks whether the subscriber already exists on the list.
 * If the subscriber exists their details are updated (PATCH); otherwise a new
 * subscriber is created (POST).
 *
 * @param {object} auth        - Authentication credentials
 * @param {string} auth.field.apikey   - Mailchimp API key
 * @param {string} auth.field.district - Mailchimp datacentre prefix (e.g. "us6")
 * @param {object} fields      - Task field values
 * @param {string} fields.field.listId       - Mailchimp list/audience ID
 * @param {string} fields.field.emailAddress - Subscriber email address
 * @param {string} [fields.field.emailType]  - "html" or "text"
 * @param {string} [fields.field.status]     - Subscriber status
 * @param {string} [fields.field.statusIfNew]- Status if new subscriber
 * @param {string} [fields.field.mergeFields]- JSON string of merge fields
 * @param {string} [fields.field.interests]  - JSON string of interests
 * @param {string} [fields.field.language]   - Language code
 * @param {string} [fields.field.vip]        - "true" or "false"
 * @param {string} [fields.field.location]   - JSON string of location data
 * @returns {Promise<{ success: boolean, action: string, data: * } | { success: false, error: object }>}
 */
async function execute(auth, fields) {
    // --- Validate required inputs ------------------------------------------------
    if (!auth || !auth.field || !auth.field.apikey || !auth.field.district) {
        return createError(
            'Missing required authentication fields (apikey, district).',
            0,
            'AUTH_MISSING'
        );
    }

    var f = fields && fields.field ? fields.field : fields;

    if (!f || !f.listId || !f.emailAddress) {
        return createError(
            'Missing required fields (listId, emailAddress).',
            0,
            'FIELDS_MISSING'
        );
    }

    var subscriberHash = md5(f.emailAddress);
    var memberPath = '/lists/' + f.listId + '/members/' + subscriberHash;

    // --- Step 1: Check if the subscriber already exists --------------------------
    var existingMember;
    try {
        var getOpts = buildRequestOptions(auth, 'GET', memberPath);
        existingMember = await request(getOpts);
    } catch (err) {
        return createError(
            'Failed to query Mailchimp for existing subscriber.',
            0,
            'REQUEST_FAILED',
            err.message
        );
    }

    // --- Step 2: Build the request body ------------------------------------------
    var body = {
        email_address: f.emailAddress,
        status: f.status || 'subscribed'
    };

    if (f.emailType)   { body.email_type = f.emailType; }
    if (f.mergeFields) { body.merge_fields = parseJsonField(f.mergeFields); }
    if (f.interests)   { body.interests = parseJsonField(f.interests); }
    if (f.language)    { body.language = f.language; }
    if (f.location)    { body.location = parseJsonField(f.location); }

    if (f.vip !== undefined && f.vip !== null && f.vip !== '') {
        body.vip = (f.vip === true || f.vip === 'true');
    }

    var subscriberExists = existingMember.statusCode === 200;
    var action;
    var response;

    try {
        if (subscriberExists) {
            // --- Step 3a: UPDATE existing subscriber (PATCH) ---------------------
            action = 'updated';
            var patchOpts = buildRequestOptions(auth, 'PATCH', memberPath);
            var payload = JSON.stringify(body);
            response = await request(patchOpts, payload);
        } else {
            // --- Step 3b: ADD new subscriber (POST) -----------------------------
            action = 'added';
            if (f.statusIfNew) { body.status = f.statusIfNew; }
            var postPath = '/lists/' + f.listId + '/members';
            var postOpts = buildRequestOptions(auth, 'POST', postPath);
            var payload = JSON.stringify(body);
            response = await request(postOpts, payload);
        }
    } catch (err) {
        return createError(
            'Failed to ' + (subscriberExists ? 'update' : 'add') + ' subscriber on Mailchimp.',
            0,
            'REQUEST_FAILED',
            err.message
        );
    }

    // --- Step 4: Evaluate the API response ---------------------------------------
    if (response.statusCode >= 200 && response.statusCode < 300) {
        return {
            success: true,
            action: action,
            data: response.body
        };
    }

    var apiError = response.body || {};
    return createError(
        apiError.detail || apiError.title || 'Mailchimp API request failed.',
        response.statusCode,
        apiError.type || 'API_ERROR',
        apiError
    );
}

module.exports = { execute: execute };

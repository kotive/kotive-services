/**
 * Helper functions for JavaScript-based service endpoints
 * 
 * These utility functions provide common transformations and operations
 * needed when implementing custom integration logic.
 */

const crypto = require('crypto');
const https = require('https');

/**
 * Convert email to MD5 hash
 * @param {string} email - Email address to hash
 * @returns {string} MD5 hash of the email (lowercase)
 */
function emailToMd5(email) {
  return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

/**
 * Convert string to MD5 hash
 * @param {string} str - String to hash
 * @returns {string} MD5 hash of the string
 */
function stringToMd5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

/**
 * Parse string to boolean
 * @param {string|boolean} value - Value to convert
 * @returns {boolean} Boolean value
 */
function stringToBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
}

/**
 * Parse string to number
 * @param {string|number} value - Value to convert
 * @returns {number} Numeric value or NaN if conversion fails
 */
function stringToNumber(value) {
  if (typeof value === 'number') return value;
  return parseFloat(value);
}

/**
 * Parse string to number or return null
 * @param {string|number} value - Value to convert
 * @returns {number|null} Numeric value or null if conversion fails
 */
function stringToNumberOrNull(value) {
  if (typeof value === 'number') return value;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

/**
 * Parse JSON string to object
 * @param {string|object} value - Value to parse
 * @returns {object} Parsed object or empty object
 */
function stringToHash(value) {
  if (typeof value === 'object') return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
  return {};
}

/**
 * Parse JSON string to object or return null
 * @param {string|object} value - Value to parse
 * @returns {object|null} Parsed object or null
 */
function stringToHashOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'object') return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Convert comma-separated string to array
 * @param {string} value - Comma-separated string
 * @returns {array} Array of trimmed strings
 */
function commaToArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(item => item);
  }
  return [];
}

/**
 * Convert comma-separated string to array or return null
 * @param {string} value - Comma-separated string
 * @returns {array|null} Array of trimmed strings or null
 */
function commaToArrayOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    const arr = value.split(',').map(item => item.trim()).filter(item => item);
    return arr.length > 0 ? arr : null;
  }
  return null;
}

/**
 * Encode URI component
 * @param {string} value - Value to encode
 * @returns {string} URI encoded string
 */
function encodeUri(value) {
  return encodeURIComponent(value);
}

/**
 * Make HTTPS request
 * @param {string} url - Full URL to request
 * @param {object} options - Request options (method, headers, body)
 * @returns {Promise<object>} Response object with status, ok, and data properties
 */
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            status: res.statusCode,
            ok: res.statusCode >= 200 && res.statusCode < 300,
            data: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            ok: res.statusCode >= 200 && res.statusCode < 300,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

module.exports = {
  emailToMd5,
  stringToMd5,
  stringToBoolean,
  stringToNumber,
  stringToNumberOrNull,
  stringToHash,
  stringToHashOrNull,
  commaToArray,
  commaToArrayOrNull,
  encodeUri,
  makeRequest
};

/**
 * Mailchimp - Add or update a list member
 * 
 * Add a new member to a Mailchimp list if they do not exist, otherwise update existing member.
 * Documentation: http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#edit-put_lists_list_id_members_subscriber_hash
 */

const { emailToMd5, stringToBoolean, stringToHash, makeRequest } = require('../helper');

/**
 * Execute the Mailchimp add or update list member action
 * 
 * @param {object} params - Parameters object
 * @param {string} params.listId - The unique ID of the list
 * @param {string} params.emailAddress - The email address of the subscriber
 * @param {string} params.emailType - The type of email (html or text)
 * @param {string} params.status - Current status of subscriber (subscribed, unsubscribed, cleaned, pending)
 * @param {string} params.statusIfNew - Status of subscriber if new (subscribed, unsubscribed, cleaned, pending)
 * @param {string|object} params.mergeFields - Merge fields as JSON string or object
 * @param {string|object} params.interests - Interests as JSON string or object
 * @param {string} params.language - Language code (default: 'en')
 * @param {string|boolean} params.vip - Is the subscriber a VIP (true/false)
 * @param {string|object} params.location - Location information as JSON string or object
 * @param {object} auth - Authentication object
 * @param {string} auth.apikey - Mailchimp API key
 * @param {string} auth.district - Mailchimp datacenter/district
 * @returns {Promise<object>} Response from Mailchimp API
 */
async function execute(params, auth) {
  // Validate required parameters
  if (!params.listId) {
    throw new Error('listId is required');
  }
  if (!params.emailAddress) {
    throw new Error('emailAddress is required');
  }
  if (!params.status) {
    throw new Error('status is required');
  }
  if (!auth || !auth.apikey) {
    throw new Error('API key is required in auth');
  }
  if (!auth.district) {
    throw new Error('District/datacenter is required in auth');
  }

  // Generate subscriber hash from email
  const subscriberHash = emailToMd5(params.emailAddress);
  
  // Construct the API endpoint
  const baseUrl = `https://${auth.district}.api.mailchimp.com/3.0`;
  const endpoint = `${baseUrl}/lists/${params.listId}/members/${subscriberHash}`;
  
  // Prepare authorization header (Basic Auth with "anystring:apikey")
  const authString = Buffer.from(`anystring:${auth.apikey}`).toString('base64');
  
  // Prepare headers
  const headers = {
    'Authorization': `Basic ${authString}`,
    'Content-Type': 'application/json'
  };

  // Prepare request body
  const requestBody = {
    email_address: params.emailAddress,
    status: params.status
  };

  // Add optional fields
  if (params.emailType) {
    requestBody.email_type = params.emailType;
  }
  
  if (params.statusIfNew) {
    requestBody.status_if_new = params.statusIfNew;
  }

  if (params.mergeFields) {
    requestBody.merge_fields = stringToHash(params.mergeFields);
  }

  if (params.interests) {
    requestBody.interests = stringToHash(params.interests);
  }

  if (params.language) {
    requestBody.language = params.language;
  }

  if (params.vip !== undefined && params.vip !== null) {
    requestBody.vip = stringToBoolean(params.vip);
  }

  if (params.location) {
    requestBody.location = stringToHash(params.location);
  }

  // Use PUT to add or update the subscriber
  // PUT is idempotent and will create if not exists or update if exists
  try {
    const response = await makeRequest(endpoint, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Return error response in expected format
      return {
        status: 'error',
        code: response.status,
        name: response.data.title || 'Request_Failed',
        error: response.data.detail || response.data.error || 'An error occurred processing your request'
      };
    }

    // Return success response
    return response.data;
    
  } catch (error) {
    // Return error in expected format
    return {
      status: 'error',
      code: -99,
      name: 'Unknown_Exception',
      error: error.message || 'An unknown error occurred processing your request. Please try again later.'
    };
  }
}

module.exports = { execute };

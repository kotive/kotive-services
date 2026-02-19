# Postmark

Reliable delivery for your transactional emails.

## Service Configuration

- **File:** `config.json`
- **Name:** Postmark
- **Auth Method:** Custom
- **Domain:** `https://api.postmarkapp.com`

### Authentication Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| API key | `apikey` | text | Yes |

Your Postmark Server API token. Found in your Postmark server under **Settings → API Tokens**. Never expose your API key in client-side code.

---

## Tasks

### Send a transactional email

- **File:** `send_transactional_email.json`
- **Description:** Send a new transactional email.
- **Endpoint:** `POST /email`
- **Documentation:** https://postmarkapp.com/developer/api/email-api#send-a-single-email

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| From name | `fromName` | text | No |
| From email | `fromEmail` | email | Yes |
| Reply To email | `replyToEmail` | email | Yes |
| To | `to` | text | Yes |
| Subject | `subject` | text | Yes |
| Message | `message` | textarea | Yes |
| Tag | `tag` | text | No |
| Track when this email is opened | `trackOpens` | radio (`true` Yes, `false` No) | Yes |
| Track when links in this email are clicked | `trackLinks` | radio (`HtmlAndText` Yes, `None` No) | Yes |

#### Expected Response

```json
{
  "success": {
    "To": "receiver@example.com",
    "SubmittedAt": "2025-01-01T10:00:00.0000000-04:00",
    "MessageID": "b7bc2f4a-e38e-4336-af7d-e6c392c2f817",
    "ErrorCode": 0,
    "Message": "OK"
  },
  "error": {
    "ErrorCode": 300,
    "Message": "Invalid 'From' value."
  }
}
```

---

## Further Reading

- [Postmark API Documentation](https://postmarkapp.com/developer/api/email-api)
- [Send Email with API](https://postmarkapp.com/developer/user-guide/send-email-with-api)

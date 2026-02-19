# BulkSMS

Get your message across. A leading provider of business messaging solutions offering two-way SMS communication from anywhere at any time.

## Service Configuration

- **File:** `config.json`
- **Name:** Bulksms
- **Auth Method:** Custom
- **Domain:** `https://api.bulksms.com/v1`

### Authentication Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Token Id | `token` | text | Yes |
| Token Secret | `secret` | text | Yes |

Your BulkSMS API token credentials. Found in **BulkSMS.com → Settings → Developer Settings**.

---

## Tasks

### Send a SMS

- **File:** `send_sms.json`
- **Description:** Reach any customer on any mobile phone, anywhere.
- **Endpoint:** `POST /messages`
- **Documentation:** https://www.bulksms.com/developer/json/v1/#tag/Message%2Fpaths%2F~1messages%2Fpost

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Send to these mobile numbers | `to` | text | Yes |
| Message | `message` | textarea | Yes |

#### Expected Response

```json
{
  "success": [
    {
      "id": "12345678",
      "type": "SENT",
      "from": "BulkSMS",
      "to": { "type": "INTERNATIONAL", "address": "44777777777" },
      "body": "Your message content",
      "encoding": "TEXT",
      "protocolId": 0,
      "numberOfParts": 1,
      "creditCost": 1.0,
      "status": {
        "id": "ACCEPTED",
        "type": "ACCEPTED",
        "subtype": "ACCEPTED"
      }
    }
  ],
  "error": {
    "status": 400,
    "title": "Bad Request",
    "detail": "Validation failed",
    "type": "https://developer.bulksms.com/json/v1/errors#validation"
  }
}
```

---

### Send a repliable SMS

- **File:** `send_repliable_sms.json`
- **Description:** Reach any customer on any mobile phone, anywhere.
- **Endpoint:** `POST /messages`
- **Documentation:** https://www.bulksms.com/developer/json/v1/#tag/Message%2Fpaths%2F~1messages%2Fpost

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Send to these mobile numbers | `to` | text | Yes |
| Message | `message` | textarea | Yes |

This task sets the `from` type to `REPLIABLE`, enabling recipients to reply to the SMS.

#### Expected Response

```json
{
  "success": [
    {
      "id": "12345678",
      "type": "SENT",
      "from": { "type": "REPLIABLE", "address": "12345" },
      "to": { "type": "INTERNATIONAL", "address": "44777777777" },
      "body": "Your message content",
      "encoding": "TEXT",
      "protocolId": 0,
      "numberOfParts": 1,
      "creditCost": 1.0,
      "status": {
        "id": "ACCEPTED",
        "type": "ACCEPTED",
        "subtype": "ACCEPTED"
      }
    }
  ],
  "error": {
    "status": 400,
    "title": "Bad Request",
    "detail": "Validation failed",
    "type": "https://developer.bulksms.com/json/v1/errors#validation"
  }
}
```

---

## Further Reading

- [BulkSMS API Documentation](https://www.bulksms.com/developer/json/v1/)

# VerifyNow

South Africa's identity verification and compliance API. Verify IDs, screen for AML/PEP, and more.

## Service Configuration

- **File:** `config.json`
- **Name:** VerifyNow
- **Auth Method:** Custom
- **Domain:** `https://www.verifynow.co.za/api/external`

### Authentication Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| API Key | `apikey` | text | Yes |

Your VerifyNow API key. Found in your VerifyNow dashboard. Never expose your API key in client-side code.

---

## Tasks

### ID Verification Bundle

- **File:** `id_verification_bundle.json`
- **Description:** Complete identity verification bundle including ID check, photo, consumer trace, and credit score in a single call. 15 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "names": "JOHN",
    "surname": "DOE",
    "dob": "1980-01-01",
    "gender": "Male",
    "citizenshipStatus": "SA Citizen",
    "deceased": false,
    "photo": "<base64-encoded-image>",
    "consumerTrace": {
      "addressData": [],
      "employmentData": [],
      "contactData": [],
      "definiteMatchData": {}
    },
    "creditScore": {
      "score": 650,
      "riskCategory": "Medium"
    }
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 15,
    "availableCredits": 2
  }
}
```

---

### ID Verification

- **File:** `id_verification.json`
- **Description:** Check if a South African ID number is valid. Returns the person's name, date of birth, gender, and whether they are deceased. 3 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "names": "JOHN",
    "surname": "DOE",
    "dob": "1980-01-01",
    "gender": "Male",
    "citizenshipStatus": "SA Citizen",
    "deceased": false
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 3,
    "availableCredits": 2
  }
}
```

---

### SAID Verification

- **File:** `said_verification.json`
- **Description:** Basic South African ID number validation against Home Affairs. Returns ID validity and basic details. 2 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "valid": true,
    "names": "JOHN",
    "surname": "DOE",
    "dob": "1980-01-01",
    "gender": "Male",
    "citizenshipStatus": "SA Citizen",
    "deceased": false
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 2,
    "availableCredits": 0
  }
}
```

---

### ID Verification + Photo

- **File:** `id_verification_photo.json`
- **Description:** Verify a South African ID number and retrieve the official Home Affairs ID photo. 5 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "names": "JOHN",
    "surname": "DOE",
    "dob": "1980-01-01",
    "gender": "Male",
    "citizenshipStatus": "SA Citizen",
    "deceased": false,
    "photo": "<base64-encoded-image>"
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 5,
    "availableCredits": 2
  }
}
```

---

### Home Affairs Real-time IDV

- **File:** `home_affairs_real_time_idv.json`
- **Description:** Live query to Home Affairs for real-time ID details and photo. Returns the most up-to-date information. 8 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "names": "JOHN",
    "surname": "DOE",
    "dob": "1980-01-01",
    "gender": "Male",
    "citizenshipStatus": "SA Citizen",
    "deceased": false,
    "photo": "<base64-encoded-image>"
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 8,
    "availableCredits": 2
  }
}
```

---

### Consumer Trace (All-in-One)

- **File:** `consumer_trace.json`
- **Description:** A single API call that returns address data, employment history, contact details, and ID verification. Your one-stop endpoint for consumer data. 7 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "addressData": [
      {
        "type": "Residential",
        "line1": "123 Main Street",
        "city": "Cape Town",
        "province": "Western Cape",
        "postalCode": "8001"
      }
    ],
    "employmentData": [
      {
        "employerName": "Acme Corp",
        "startDate": "2020-01-01"
      }
    ],
    "contactData": {
      "cellNumbers": ["0821234567"],
      "landlineNumbers": ["0211234567"]
    },
    "definiteMatchData": {
      "names": "JOHN",
      "surname": "DOE",
      "dob": "1980-01-01",
      "gender": "Male"
    }
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 7,
    "availableCredits": 2
  }
}
```

---

### Credit Score

- **File:** `credit_score.json`
- **Description:** Get a consumer's credit score and risk profile using their South African ID number. 5 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| ID Number | `idNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "idNumber": "8001015009087",
    "score": 650,
    "riskCategory": "Medium"
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 5,
    "availableCredits": 2
  }
}
```

---

### Phone Lookup (Reverse)

- **File:** `phone_lookup_reverse.json`
- **Description:** Reverse phone lookup — find out who owns a phone number. Use this when you have a phone number and want to find the owner. 3 credits.
- **Endpoint:** `POST /verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Contact Number | `contactNumber` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "contactNumber": "0821234567",
    "owner": {
      "names": "JOHN",
      "surname": "DOE",
      "idNumber": "8001015009087"
    }
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 3,
    "availableCredits": 2
  }
}
```

---

### AML/PEP Screening

- **File:** `aml_pep_screening.json`
- **Description:** Screen individuals or companies against global sanctions lists, PEP databases, and crime/adverse media records. 5 credits.
- **Endpoint:** `POST /aml-screening`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Name | `name` | text | Yes |
| Entity Type | `entity` | radio (`0` Person, `1` Company, `2` Organization, `3` Legal Entity, `6` Airplane, `7` Vessel) | Yes |
| Country | `country` | text | Yes |
| Dataset | `dataset` | radio (`all`, `sanctions`, `peps`, `crime`) | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "name": "John Doe",
    "entity": 0,
    "country": "za",
    "dataset": "all",
    "matches": [
      {
        "name": "JOHN DOE",
        "matchScore": 95,
        "category": "pep",
        "source": "PEP Database"
      }
    ],
    "totalMatches": 1
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 5,
    "availableCredits": 2
  }
}
```

---

### Vehicle Lookup

- **File:** `vehicle_lookup.json`
- **Description:** Look up vehicle details using a registration number or VIN. Returns vehicle make, model, year, and other details. 5 credits.
- **Endpoint:** `POST /vehicle`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Registration Number | `registration_number` | text | No |
| VIN Number | `vin_number` | text | No |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

Either Registration Number or VIN Number is required.

#### Expected Response

```json
{
  "success": {
    "registration_number": "ABC123GP",
    "vin_number": "1HGBH41JXMN109186",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "colour": "White",
    "engineNumber": "ABC123456",
    "registrationDate": "2020-06-15"
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 5,
    "availableCredits": 2
  }
}
```

---

### Face Match (Home Affairs)

- **File:** `face_match_home_affairs.json`
- **Description:** Compare a selfie against the official Home Affairs ID photo. Just send the selfie and ID number. 5 credits.
- **Endpoint:** `POST /facematch`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Selfie Image (Base64) | `selfie_image_base64` | textarea | Yes |
| ID Number | `id_number` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "match": true,
    "confidence": 98.5,
    "id_number": "8001015009087"
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 5,
    "availableCredits": 2
  }
}
```

---

### Face Match (Standard)

- **File:** `face_match_standard.json`
- **Description:** Compare two photos for face similarity. Provide a selfie and a reference image to check if they are the same person. 3 credits.
- **Endpoint:** `POST /facematch`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Selfie Image (Base64) | `selfie_image_base64` | textarea | Yes |
| Reference Image (Base64) | `reference_image_base64` | textarea | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "match": true,
    "confidence": 97.2
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 3,
    "availableCredits": 2
  }
}
```

---

### Face Match + ID Verification

- **File:** `face_match_id_verification.json`
- **Description:** Combined face match plus SAID verification. Compare a selfie against a reference image and verify the ID number. 7 credits.
- **Endpoint:** `POST /facematch`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Selfie Image (Base64) | `selfie_image_base64` | textarea | Yes |
| Reference Image (Base64) | `reference_image_base64` | textarea | Yes |
| ID Number | `id_number` | text | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "match": true,
    "confidence": 96.8,
    "id_number": "8001015009087",
    "idVerification": {
      "valid": true,
      "names": "JOHN",
      "surname": "DOE",
      "dob": "1980-01-01",
      "gender": "Male",
      "citizenshipStatus": "SA Citizen",
      "deceased": false
    }
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 7,
    "availableCredits": 2
  }
}
```

---

### Passive Liveness Detection

- **File:** `passive_liveness_detection.json`
- **Description:** Check if an image is a real person and not a photo of a photo, mask, or deepfake. 3 credits.
- **Endpoint:** `POST /passive-liveness`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Image (Base64) | `image_base64` | textarea | Yes |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "isLive": true,
    "confidence": 99.1
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 3,
    "availableCredits": 2
  }
}
```

---

### ID Document OCR

- **File:** `id_document_ocr.json`
- **Description:** Extract data from ID documents using OCR. Supports ID cards, passports, and driver's licenses. 6 credits.
- **Endpoint:** `POST /id-document-verify`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Front Image (Base64) | `front_image_base64` | textarea | Yes |
| Back Image (Base64) | `back_image_base64` | textarea | No |
| Document Type | `document_type` | text | No |
| Issuing Country | `issuing_country` | text | No |
| Mode | `mode` | radio (`sandbox`, `production`) | Yes |

#### Expected Response

```json
{
  "success": {
    "documentType": "id_card",
    "issuingCountry": "ZAF",
    "extractedData": {
      "idNumber": "8001015009087",
      "names": "JOHN",
      "surname": "DOE",
      "dob": "1980-01-01",
      "gender": "Male",
      "nationality": "South African"
    }
  },
  "error": {
    "error": "Insufficient credits",
    "requiredCredits": 6,
    "availableCredits": 2
  }
}
```

---

### My Credits

- **File:** `my_credits.json`
- **Description:** Check your current VerifyNow credit balance. 0 credits.
- **Endpoint:** `GET /my_credits`

#### Fields

No fields required.

#### Expected Response

```json
{
  "success": {
    "available_credits": 1000
  },
  "error": {
    "error": "Unauthorized",
    "message": "Invalid or missing API key"
  }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success — request completed |
| 400 | Bad Request — invalid parameters |
| 401 | Unauthorized — invalid or missing API key |
| 402 | Payment Required — insufficient credits |
| 409 | Conflict — idempotency key reused with different payload |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Server Error — try again later |

## Rate Limits

Face matching and liveness endpoints (`/facematch`, `/passive-liveness`) have specific rate limits:

- 60 requests per minute per API key
- 1,000 requests per hour per API key
- Max image size: 10 MB (Base64 encoded)
- 10 concurrent requests per API key

## Further Reading

- [VerifyNow API Documentation](https://www.verifynow.co.za/api-docs)

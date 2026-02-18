# How to Add a Service to kotive-services

This guide explains how to add a new service integration to the kotive-services repository.

## Overview

Each service in kotive-services is organized as a folder containing:

- `config.json` - Service configuration and authentication
- `icon.png` - Service icon (200x200 pixels)
- `icon32x32.png` - Small service icon (32x32 pixels)
- `*.json` - Task files (one file per API endpoint/task)

## Step-by-Step Guide

### 1. Create the Service Folder

Create a new folder in the repository root with the service name in lowercase (no spaces):

```
mkdir servicename
```

### 2. Create config.json

The `config.json` file defines the service metadata and authentication method.

**Example with API Key authentication:**

```json
{
  "name": "ServiceName",
  "description": "Brief description of the service.",
  "auth": {
    "method": "Custom",
    "fields": [
      {
        "label": "API Key",
        "properties": {
          "parameter": "apikey",
          "fieldType": "text",
          "helptext": "Instructions on where to find the API key"
        },
        "readonly": false,
        "required": true,
        "visible": true
      }
    ]
  },
  "domain": "https://api.service.com"
}
```

**Example with username/password (Basic Auth):**

```json
{
  "name": "ServiceName",
  "description": "Brief description of the service.",
  "auth": {
    "method": "Custom",
    "fields": [
      {
        "label": "Username",
        "properties": {
          "parameter": "username",
          "fieldType": "text"
        },
        "readonly": false,
        "required": true,
        "visible": true
      },
      {
        "label": "Password",
        "properties": {
          "parameter": "password",
          "fieldType": "text"
        },
        "readonly": false,
        "required": true,
        "visible": true
      }
    ]
  },
  "domain": "https://api.service.com"
}
```

**Example with no authentication:**

```json
{
  "name": "ServiceName",
  "description": "Brief description of the service.",
  "auth": {
    "method": "none"
  },
  "domain": "https://api.service.com"
}
```

### 3. Create Icon Files

Create two PNG icon files:

- `icon.png` - 200x200 pixels
- `icon32x32.png` - 32x32 pixels

These should represent the service visually (usually the service logo or initials).

### 4. Create Task JSON Files

Each API endpoint/task gets its own JSON file. The filename should be descriptive and use underscores (e.g., `send_email.json`, `id_verification.json`).

**Task File Structure:**

```json
{
  "name": "Task Name",
  "description": "Description of what this task does. Include credit/cost info if applicable.",
  "documentation": "https://link-to-api-docs",
  "fields": [
    {
      "label": "Field Label",
      "properties": {
        "parameter": "fieldName",
        "fieldType": "text|email|textarea|radio|date|url",
        "helptext": "Help text for the user"
      },
      "readonly": false,
      "required": true,
      "visible": true
    }
  ],
  "method": "POST|GET|PUT|DELETE",
  "headers": {
    "Authorization": "Bearer {auth.field.apikey}",
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  "endpoint": "/v1/endpoint-path",
  "request": {
    "fieldName": "{field.fieldName}"
  },
  "response": {
    "success": {},
    "error": {}
  }
}
```

### Field Types

| Field Type | Description            |
| ---------- | ---------------------- |
| `text`     | Single-line text input |
| `email`    | Email address input    |
| `textarea` | Multi-line text input  |
| `radio`    | Radio button selection |
| `date`     | Date picker            |
| `url`      | URL input              |

**Radio Field Example:**

```json
{
  "label": "Option Selection",
  "properties": {
    "parameter": "option",
    "fieldType": "radio",
    "choices": [
      { "key": "option1", "value": "Option 1" },
      { "key": "option2", "value": "Option 2" }
    ],
    "default": "option1",
    "classes": "inline"
  },
  "readonly": false,
  "required": true,
  "visible": true
}
```

### Authentication Headers

**API Key in Custom Header (e.g., x-api-key):**

```json
"x-api-key": "{auth.field.apikey}"
```

**Bearer Token:**

```json
"Authorization": "Bearer {auth.field.apikey}"
```

**Basic Auth (username:password):**

```json
"Authorization": "Basic {base64_encode_username_password(auth.field.username:auth.field.password)}"
```

**Custom Header:**

```json
"X-Custom-Header": "{auth.field.apikey}"
```

### Special Placeholders

| Placeholder                              | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `{auth.field.PARAM}`                     | Authentication field value              |
| `{field.PARAM}`                          | Task field value                        |
| `{generate_uuid_v4}`                     | Generate a new UUID v4                  |
| `{group.id}`                             | Current group ID                        |
| `{base64_encode_username_password(A:B)}` | Base64 encode credentials               |
| `{string_to_boolean(value)}`             | Convert string to boolean               |
| `{comma_to_array(value)}`                | Convert comma-separated string to array |
| `{string_to_hash(value)}`                | Parse JSON string to object             |

### 5. Register the Service

Add the service to `services.json` in alphabetical order:

```json
{
  "name": "Service Display Name",
  "service": "servicefoldername"
}
```

## Example: Adding a New Service

Let's say you're adding a service called "ExampleAPI":

1. Create folder: `exampleapi/`

2. Create `exampleapi/config.json`:

```json
{
  "name": "ExampleAPI",
  "description": "An example API service.",
  "auth": {
    "method": "Custom",
    "fields": [
      {
        "label": "API Key",
        "properties": {
          "parameter": "apikey",
          "fieldType": "text"
        },
        "readonly": false,
        "required": true,
        "visible": true
      }
    ]
  },
  "domain": "https://api.example.com"
}
```

3. Create icon files (200x200 and 32x32 PNG)

4. Create task files, e.g., `exampleapi/get_data.json`:

```json
{
  "name": "Get Data",
  "description": "Retrieve data from the API.",
  "documentation": "https://api.example.com/docs",
  "fields": [
    {
      "label": "Data ID",
      "properties": {
        "parameter": "dataId",
        "fieldType": "text"
      },
      "readonly": false,
      "required": true,
      "visible": true
    }
  ],
  "method": "GET",
  "headers": {
    "Authorization": "Bearer {auth.field.apikey}",
    "Accept": "application/json"
  },
  "endpoint": "/v1/data/{field.dataId}",
  "request": {},
  "response": {
    "success": {},
    "error": {}
  }
}
```

5. Add to `services.json` (in alphabetical order):

```json
{
  "name": "ExampleAPI",
  "service": "exampleapi"
}
```

## Best Practices

1. **Descriptions**: Include credit/cost information in task descriptions when applicable
2. **Help Text**: Provide helpful guidance in the `helptext` property
3. **Documentation Links**: Always include API documentation links
4. **Idempotency**: For APIs that support idempotency, include the `Idempotency-Key` header with `{generate_uuid_v4}`
5. **Field Validation**: Mark required fields as `"required": true`
6. **Naming**: Use descriptive, snake_case filenames for task files

## Validation

After creating files, validate all JSON:

```bash
# Validate all JSON files in a service folder
for f in servicename/*.json; do python3 -m json.tool "$f" > /dev/null && echo "$f: OK" || echo "$f: INVALID"; done

# Validate services.json
python3 -m json.tool services.json > /dev/null && echo "services.json: OK"
```

## Reference Services

For additional examples, refer to these existing services:

- `postmark/` - Email service with API key auth
- `bulksms/` - SMS service with token auth
- `kotive/` - Multiple tasks with Basic Auth
- `hunter/` - GET requests with query parameters
- `webhook/` - Service with no authentication
- `verifynow/` - South African ID verification with x-api-key auth and sandbox/production modes

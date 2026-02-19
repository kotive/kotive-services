# Make Learning Flow

Include MakeLearningFlow related tasks as tasks in your taskflows.

## Service Configuration

- **File:** `config.json`
- **Name:** Make Learning Flow
- **Auth Method:** Custom
- **Domain:** `https://webapp.kotive.com`

### Authentication Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Email address | `username` | text | Yes |
| Password | `password` | text | Yes |

The email address and password you use to login to Kotive. At a minimum the 'User Administrator' and 'Contacts Administrator' roles should be assigned to this account.

---

## Tasks

### Signup to a course

- **File:** `signup.json`
- **Description:** Signup a person to a course in Kotive's MakeLearning Flow
- **Endpoint:** `POST /hub/q/add/learnSubscriptions`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Firstname of person to be signed up | `firstname` | text | No |
| Lastname of person to be signed up | `lastname` | text | No |
| Email address of person to be signed up | `email` | email | Yes |
| Mobile of person to be signed up | `mobile` | text | No |
| Unique ID of person to be signed up | `uniqueId` | text | No |
| Course ID | `workflowId` | text | Yes |
| Signup task ID | `taskId` | text | Yes |
| Signup field ID | `fieldId` | text | Yes |
| Extra signup parameters | `extraParams` | text | No |
| Resubscribe to the course? | `resubscribe` | radio (`true` Yes, `false` No) | Yes |
| Should the person be notified by email? | `notify` | radio (`true` Yes, `false` No) | Yes |

#### Expected Response

```json
{
  "success": {
    "subscriptionId": 12345,
    "contactId": 67890,
    "courseId": 200,
    "status": "subscribed"
  },
  "error": {}
}
```

---

### Calculate progress and grade

- **File:** `calculate.json`
- **Description:** Calculate the progress and grade for a person in Kotive's Make Learning Flow
- **Endpoint:** `GET /hub/learn/courses/progress/{group.id}/{workflowId}/{taskId}_{fieldId}/{contactId}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Course ID | `workflowId` | text | Yes |
| Signup form ID | `taskId` | text | Yes |
| Sign field ID | `fieldId` | text | Yes |
| Contact ID | `contactId` | text | Yes |

#### Expected Response

```json
{
  "success": {
    "contactId": 12345,
    "courseId": 200,
    "progress": 75,
    "grade": 82
  },
  "error": {}
}
```

---

### Get progress and grade

- **File:** `progress.json`
- **Description:** Get the progress and grade for a person in Kotive's Make Learning Flow
- **Endpoint:** `GET /api/group/{group.id}/learn/course/{workflowId}/subscriptions?contactId={contactId}&details={details}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Course ID | `workflowId` | text | Yes |
| Contact ID | `contactId` | text | Yes |
| Subscription details required | `details` | radio (`minimal` Minimal, `full` Full) | Yes |

#### Expected Response

```json
{
  "success": {
    "contactId": 12345,
    "courseId": 200,
    "progress": 75,
    "grade": 82,
    "status": "in_progress"
  },
  "error": {}
}
```

---

### Create a certificate

- **File:** `certificate.json`
- **Description:** Create a certificate when a person completes a course in Kotive's MakeLearning Flow
- **Endpoint:** `POST /bespoke/make-learning-flow/certificate/create/{group.id}/{templateName}/true`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Firstname | `firstname` | text | Yes |
| Lastname | `lastname` | text | Yes |
| Unique ID | `uniqueId` | text | Yes |
| Name of the certificate template | `templateName` | text | Yes |
| Name of the course | `courseName` | text | Yes |
| Description of course - line 1 | `courseDescription01` | text | No |
| Description of course - line 2 | `courseDescription02` | text | No |
| Description of course - line 3 | `courseDescription03` | text | No |
| Primary logo url | `logo01Url` | text | No |
| Secondary logo url | `logo02Url` | text | No |
| Decoration url | `ribbonUrl` | text | No |
| Signature url | `signatureUrl` | text | Yes |
| Date of Certificate | `date` | text | No |

#### Expected Response

```json
{
  "success": {
    "certificateId": 12345,
    "certificateUrl": "https://webapp.kotive.com/certificate/12345",
    "firstname": "Jane",
    "lastname": "Doe",
    "courseName": "Introduction to Data Science",
    "date": "27 Sep 2025"
  },
  "error": {}
}
```

---

## Further Reading

- [Kotive Integration Guide](http://www.kotive.com/how-to/integrate/kotive)

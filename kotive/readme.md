# Kotive

Include Kotive related tasks as tasks in your taskflows.

## Service Configuration

- **File:** `config.json`
- **Name:** Kotive
- **Auth Method:** Custom
- **Domain:** `https://webapp.kotive.com`

### Authentication Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Email address | `username` | text | Yes |
| Password | `password` | text | Yes |

The email address and password you use to login to Kotive. At a minimum the 'User Administrator' role should be assigned to this account. For integrating with Contacts, the 'Contacts Administrator' role is also needed.

---

## Tasks

### Run a Kotive Bespoke task

- **File:** `bespoke_tasks.json`
- **Description:** Execute a task available in Kotive Bespoke
- **Endpoint:** `{method} /bespoke/{bespoke_url}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Bespoke URL | `bespoke_url` | text | Yes |
| Method | `method` | radio (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) | Yes |
| Payload | `payload` | textarea | Yes |

#### Expected Response

```json
{
  "success": {},
  "error": {}
}
```

---

### Add or update a Contact

- **File:** `contacts_add_or_update.json`
- **Description:** Add a new or update an existing Contact in Kotive
- **Endpoint:** `POST /apiv3/contacts/{group.id}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Contact's firstname | `firstname` | text | No |
| Contact's lastname | `lastname` | text | No |
| Contact's email address | `email` | email | Yes |
| Contact's mobile | `mobile` | text | No |
| Contact's unique ID | `uniqueId` | text | No |
| Properties | `properties` | textarea | No |
| Status | `status` | radio (`signedup` Signed-up, `active` Active, `unsubscribed` Unsubscribed, `inactive` Inactive, `forget` Forget) | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "groupId": 100,
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "jane@example.com",
    "mobile": "+27116542354",
    "uniqueId": "EMP001",
    "status": "active"
  },
  "error": {}
}
```

---

### Send a Message to Roles

- **File:** `messages_send_to_roles.json`
- **Description:** Send a Message to all people who have these Roles
- **Endpoint:** `POST /api/group/{group.id}/messages?linkedRoles={roles}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Roles | `roles` | text | Yes |
| Type of Message | `inform` | radio (`email` Email only, `display` Display in profile only, `all` Email and display in profile) | Yes |
| Message | `message` | textarea | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "groupId": 100,
    "topic": "notifications",
    "content": "Your message content",
    "inform": "all"
  },
  "error": {}
}
```

---

### Send a Message to Tagged and Roles

- **File:** `messages_send_to_tagged_and_roles.json`
- **Description:** Send a Message to all people who have these Roles but only if the person or their groups is tagged with any of the tags
- **Endpoint:** `POST /api/group/{group.id}/messages?linkedRoles={roles}&tags={tags}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Tag Ids | `tags` | text | Yes |
| Roles | `roles` | text | Yes |
| Type of Message | `inform` | radio (`email` Email only, `display` Display in profile only, `all` Email and display in profile) | Yes |
| Message | `message` | textarea | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "groupId": 100,
    "topic": "notifications",
    "content": "Your message content",
    "inform": "all"
  },
  "error": {}
}
```

---

### Send a Message to People

- **File:** `messages_send_to_users.json`
- **Description:** Send a Message to selected people
- **Endpoint:** `POST /api/group/{group.id}/messages`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| List of User IDs | `userids` | text | Yes |
| Type of Message | `inform` | radio (`email` Email only, `display` Display in profile only, `all` Email and display in profile) | Yes |
| Message | `message` | textarea | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "groupId": 100,
    "topic": "notifications",
    "content": "Your message content",
    "inform": "all",
    "linkedTo": [1, 2, 3]
  },
  "error": {}
}
```

---

### Reactivate or deactivate tasks

- **File:** `reactivate_or_deactivate_tasks.json`
- **Description:** Reactivate completed tasks or deactivate active tasks in the current taskflow
- **Endpoint:** `POST /api/group/{group.id}/process/{taskflow.id}/{action}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Tasks | `taskIds` | text | Yes |
| Action | `action` | radio (`reactivate` Reactivate, `deactivate` Deactivate) | Yes |

#### Expected Response

```json
{
  "success": {},
  "error": {}
}
```

---

### Create a new referral code

- **File:** `referral_create.json`
- **Description:** Create a new referral code for an existing contact
- **Endpoint:** `GET /apiv3/contacts/referral/issue/{group.id}/{key}/{contactId}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Referral code key | `key` | text | Yes |
| Contact ID | `contactId` | text | Yes |

#### Expected Response

```json
{
  "success": {
    "code": "ABC123",
    "key": "campaign-2025",
    "contactId": 12345
  },
  "error": {}
}
```

---

### Redeem a referral code

- **File:** `referral_redeem.json`
- **Description:** Redeem a referral code
- **Endpoint:** `GET /apiv3/contacts/referral/redeem/{group.id}/{contactId}/{code}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Contact ID | `contactId` | text | Yes |
| Referral code | `code` | text | Yes |

#### Expected Response

```json
{
  "success": {
    "redeemed": true,
    "code": "ABC123",
    "contactId": 12345
  },
  "error": {}
}
```

---

### Start a new Workflow

- **File:** `start_workflow.json`
- **Description:** Initiate a new Workflow in Kotive
- **Endpoint:** `POST /apiv3/q/add/flow`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Group ID | `groupId` | text | Yes |
| Workflow ID | `workflowId` | text | Yes |
| Fields payload | `payload` | textarea | Yes |

#### Expected Response

```json
{
  "success": {
    "groupId": 100,
    "workflowId": 200,
    "processId": 12345
  },
  "error": {}
}
```

---

### Tag/untag a group

- **File:** `tags_group.json`
- **Description:** Tag and Untag a group with the listed tags
- **Endpoint:** `POST /api/group/{group.id}/tags/taguntag/tags/group`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Tag with these tags | `taggedTags` | text | Yes |
| Untag with these tags | `untaggedTags` | text | Yes |

#### Expected Response

```json
{
  "success": {},
  "error": {}
}
```

---

### Tag/untag a person or contact

- **File:** `tags_person_contact.json`
- **Description:** Tag and Untag a person or contact with the listed tags
- **Endpoint:** `POST /api/group/{group.id}/tags/taguntag/tags/{kind}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| What will be tagged/untagged? | `kind` | radio (`contact` Contacts, `person` People) | Yes |
| Ids of items to be tagged and/or untagged | `itemIds` | text | Yes |
| Tag with these tags | `taggedTags` | text | Yes |
| Untag with these tags | `untaggedTags` | text | Yes |

#### Expected Response

```json
{
  "success": {},
  "error": {}
}
```

---

### Tag/untag the current workflow

- **File:** `tags_workflow.json`
- **Description:** Tag and/or untag the current workflow with the listed tags
- **Endpoint:** `POST /api/group/{group.id}/tags/taguntag/tags/taskflow`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Tag with these tags | `taggedTags` | text | Yes |
| Untag with these tags | `untaggedTags` | text | Yes |

#### Expected Response

```json
{
  "success": {},
  "error": {}
}
```

---

### Assign a To-do to Roles

- **File:** `todos_assign_to_roles.json`
- **Description:** Assign a To-do to all people who have these Roles
- **Endpoint:** `POST /api/group/{group.id}/todos/assign?include_children=true`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Roles | `roleIds` | text | Yes |
| To-do | `todo` | textarea | Yes |
| Due date | `dueAt` | text | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "label": "Complete the assessment",
    "dueAt": 1700000000000,
    "status": "incomplete"
  },
  "error": {}
}
```

---

### Assign a To-do to People

- **File:** `todos_assign_to_users.json`
- **Description:** Assign a To-do to specific people
- **Endpoint:** `POST /api/group/{group.id}/todos`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| People | `peopleIds` | text | Yes |
| To-do | `todo` | textarea | Yes |
| Due date | `dueAt` | text | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "groupId": 100,
    "label": "Complete the assessment",
    "status": "incomplete",
    "assignedTo": [1, 2, 3],
    "dueAt": 1700000000000
  },
  "error": {}
}
```

---

### Add a new User

- **File:** `users_add.json`
- **Description:** Add a new User to a group in Kotive
- **Endpoint:** `POST /apiv3/user/{groupId}`

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| User's firstname | `firstname` | text | Yes |
| User's lastname | `lastname` | text | Yes |
| User's email address | `email` | email | Yes |
| User's mobile | `mobile` | text | No |
| Group ID | `groupId` | text | No |
| Role IDs | `roleIds` | text | No |
| Tags | `tags` | text | No |
| Send invitation email | `invite` | radio (`false` No, `true` Yes) | Yes |

#### Expected Response

```json
{
  "success": {
    "id": 12345,
    "groupId": 100,
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "jane@example.com",
    "mobile": "+27116542354",
    "roleIds": [1, 2],
    "tags": ["tag1", "tag2"],
    "invite": true
  },
  "error": {}
}
```

---

## Further Reading

- [Kotive Integration Guide](http://www.kotive.com/how-to/integrate/kotive)

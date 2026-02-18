# Kotive Services (integrations)

Thanks for your interest in adding your application to Kotive.

Your application will become available displayed within the Kotive Designer. Your customers will get more value from your application by having it integrated with their daily taskflows/workflows/business processes.

![Applications in the Kotive Designer](http://www.kotive.com/img/how-to/create-a-basic-taskflow-in-kotive/5b_SelectTask.png)

## How to add your application/tool/service to Kotive

- [AI can add new service](how-to-add-a-service.md)

Fork this repository.

Create a new folder in the root folder. Give it the name of your service, e.g. `/awesomeapp/`

Choose an applicable config sample (see below) and save it in `/awesomeapp/config.json`. Configs are based on the type of authentication your service uses. Samples:

- [OAuth2](/googlesheets/config.json)
- [API key/write key/token](/mandrill/config.json)
- [Basic auth](/campaignmonitor/config.json)

Update `/awesomeapp/config.json` with your service's authentication details.

Save your logo as `/awesomeapp/icon.png` (Max 200px x 200px. Min 128 px x 128 px). **The name of the PNG has to be `icon.png` otherwise it will be ignored.**

Add your service to `services.json` in the root folder. E.g.

```json
{
  "name": "My Awesome App",
  "service": "awesomeapp"
}
```

## How to add your application/tool/service as a task in taskflows

Copy the task configuration of any active integration to your `/awesomeapp/` and rename to the name of your first task. (lowercase, words separated by `_`)

Working examples you can copy:

- [Send a message to Slack](/slack/send_message.json)
- [Send an email with Mandrill](/mandrill/send_email.json)
- [Track an event in Segment](/segment/track.json)
- [Add a new row to a Google Sheet](/googlesheets/add_row.json)
- [Create a new document in DocRaptor](/docraptor/new_document.json)

**`"fields": []`** contain the user interface elements that are displayed in Kotive and that a Designer will see and use when adding your service to a taskflow.

_Be nice and helpful._ Use the `helptext` to provide clear, concise instructions (and `<a href='#' target='_blank'>external links</a>` to supporting documentation) to make it as easy as possible for your (and our) customers to use the integration.

The **`"method": ""`**, **`"headers": {}`**, **`"endpoint": ""`**, **`"request": {}`** and **`"response": {}`** contain the technical properties of your integration. _You also need to provide a `success` and an `error` sample in the `response`._

Tags for pulling in dynamic data (fields) when executing your task (using [Mandrill](/mandrill/send_email.json) as example):

- **`{field.fromEmail}`** pulls in the value of one of the `fields` in your task's config where the `parameter` is set to `fromEmail`.
- **`{auth.field.apikey}`** pulls in the value of one of the `fields` in the `config.json` where the `parameter` is set to `apikey`.

Helper tags for when you need to transform data or prep auth details:

- **`{auth.oauth2Token}`** [(example)](/googlecontacts/add_contact.json#L84)
- **`{base64_encode_username_password(auth.field.username:auth.field.password)}`** [(example)](/segment/track.json#L88)
- **`{encode_uri(field.webhook_url)}`** [(example)](/webhook/json.json#L63)
- **`{string_to_boolean(field.javascript)}`** [(example)](/docraptor/new_document.json#L118)
- **`{string_to_number(field.number)}`**
- **`{string_to_number_or_null(field.number)}`**
- **`{string_to_hash(field.mergeFields)}`** [(example)](/mailchimp/add_or_update_list_member.json#L154)
- **`{string_to_hash_or_null(field.payload)}`** [(example)](/webhook/json.json#L64)
- **`{string_to_md5(field.emailAddress)}`** [(example)](/mailchimp/add_or_update_list_member.json#L149)
- **`{comma_to_array(field.to)}`** [(example)](/clickatell/send_message.json#L39)
- **`{comma_to_array_or_null(field.to)}`** [(example)](/campaignmonitor/send_smart_email.json#L81)
- **`{comma_to_hash_array(field.to, email)}`** [(example)](/mandrill/send_email.json#L69)
- **`{json_to_xml(field.xmlpayload)}`** [(example)](/googlesheets/add_row.json#L48)
- **`{generate_uuid_v4}`** [(example)](/googleanalytics/track_event.json#L63)
- **`{find_and_replace(field.to|find|replacewith)}`** [(example)](/kotive/messages_send_to_roles.json#L52)
- **`{date_to_timestamp(field.dueAt)}`** [(example)](/kotive/todos_assign_to_roles.json)

_You can add many tasks in your `/awesomeapp/` folder by creating a copy of this task config, renaming it and updating its properties._

## Submit for testing

You'll need to [install npm](https://docs.npmjs.com/getting-started/installing-node) and [install grunt](http://gruntjs.com/installing-grunt).

Set up the required dependencies using npm.

`npm install .`

Then run the JSON lint validator & thumbnail generator. _More thorough tests to be added in future._

`grunt build`

Submit a **pull request** to the `staging` branch if the grunt tasks passed successfully. The JSON should be 'syntax error-free' and the thumbnails should have been generated.

Another collaborator will review your json configs, language used, helptext, etc. When happy they will accept your pull request and it will be deployment to our staging environment. You'll test it in there. When testing has been completed, issue a pull request to master - for review and deployment to our production environment.

Thanks for contributing!

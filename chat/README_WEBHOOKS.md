# Setup Webhooks Subscription

How to create an endpoint on your server to receive webhooks notifications from Meta and subscribe to webhooks fields for Instagram professional account using your app.

This allows you to receive real-time notifications when:

- Someone comments on the Media objects of the Instagram professional account using your app.
- @mentions your app users.
- Your app user's Stories expire
- A instagram user sends a message to that instagram professional account.

### The Steps

1. Create an endpoint on your server to receive webhooks from Meta.

- Verify requests from Meta - Occurs in the Meta App Dashboard.
- Accept and validate JSON payloads from Meta - Occurs on your server.

2. Subscribe your app to webhooks fields - Occurs in the Meta App Dashboard.

3. Enable your app user's instagram account to receive notifications via an API call to Meta.

4. Test the setup by sending a message to your instagram professional account.

## Limitations

- Apps must be set to **Live** to receive webhooks notifications.
- Advanced Access is required to receive _comments_ and _live_comments_ webhooks notifications.
- The instagram professional account that owns the media objects _must be public to receive notifications for comments or @mentions_.
- Notifications for Comments on _Live Media_ are only sent during the live broadcast.
- Account level webhooks customizations is not supported. If your app user is subscribed to any Instagram webhook field, your app receives notifications for all fields the app is subscribed to.
- Albums IDs are not included in webhooks notifications. Use the Comment ID received in the notification to get the album ID.
- The ad ID will not be returned for media used in dynamic ads.
- Notifications for _story_insights_ events will only show metrics for the first 24 hours, before the story expires, even if the story is a highlight.

## Create an endpoint

This step must be completed before you can subscribe to any webhook fields in the _App Dashboard_.

Your endpoint must be able to process two types of HTTPS requests:

- Verification Requests.
- Event Notifications.

Since both requests use HTTPs, your server must have a valid TLS or SSL certificate correctly configured and installed. Self-signed certificate are not supported.

The sections below explain what will be each type of request and how to respond to them.

## Verification Requests

Anytime you configure the Webhooks product in your App Dashboard, we'll send a GET request to your endpoint URL.

Verification requests include the following query string parameters, appended to the end of your endpoint URL.

```
// Sample Verification Request

GET https://www.your-clever-domain-name.com/webhooks?
  hub.mode=subscribe&
  hub.challenge=1158201444&
  hub.verify_token=meatyhamhock

```

- hub.mode => subscribe => This value will always be set to 'subscribe'.

- hub.challenge => 1158201444 => An int you must pass back to us.

- hub.verification => meatyhamhock => A string that we grab from the _Verify Token_ field in your app's App Dashboard. You will set this string when you complete the _webhooks configuration settings_ steps.

## Validating Verification Requests

Whenever your endpoint receives a verification request, it must:

- Verify that the `hub.verify_token` value matches the string you set in the _Verify Token_ field when you _configure the Webhooks product_ in your App Dashboard (you haven't set up this token string yet).

- Respond with the `hub.challenge` value.

If you are in your App Dashboard and configuring your Webhooks product (and thus, triggering a Verification Request), the dashboard will indicate if your endpoint validated the request correctly.

If you are using the Graphs `app/subscription` endpoint to configure webhooks product, the API will indicate success or failure with a response.

## Event notifications

When you configure your Webhooks product, you will subscribe to specific _fields_ on an _object_ type (e.g photos field on the user object). Whenever there's a change to one of these fields, we will send your endpoint a POST request with a JSON payload describing the change.

For example, if you subscribed to the _user_ object's _photos_ field and one of your app's Users posted a Photo, we would send you a _POST_ request that would look something like this:

```
POST / HTTPS/1.1
Host: your-clever-domain.name/webhooks
Content-Type: application/json
X-Hub-Signature-256: sha256={super-long-SHA256-signature}
Content-Length: 311

{
  "entry: [
    {
      "time": 1520383571,
      "changes":[
        {
          "fields": "photos",
          "value":
          {
            "ver": "update",
            "object_id": "1020215100451",
          }
        }
      ]
      "id": "10210299214143514",
      "uid": "10210299214143514",
    }
  ],
  "object": "user"
}

```

## Payload Contents

Payloads will contain an object describing the change. When you _configure the webhooks product_. You can indicate if payloads should only contain the names of changed fields, or if payloads should include the new values as well.

We format all payloads with JSON, so you can parse the payloads using common JSON parsing methods or packges.

- You will not be able to query historical webhook event notification data, so be sure to capture and store any webhook payload content that you want to keep

Most payloads will contain the following common properties, but the contents and structure of each payload vaires depending on the objects fields you are subscribed to. Refer to each object's reference document to see which fields will be included.

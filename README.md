# Business Login for Instagram

Business Login is a custom login flow that allows your app to ask for permissions to access your app **user's Instagram professional account** data and to get **access token** to use in your **app's API requests**.

- _instagram_business_basic_
- _instagram_business_content_publish_
- _instagram_business_manage_messages_
- _instagram_business_manage_comments_

## How it works

Your app user launches the _login flow_ on your appp or website by clicking _your embed URL link or button_.

This _embed URL_, that you set up in the **App Dashboard** with the permissions you are requesting from your app users, opens an **authorization window**.

Your app user uses this window to _grant your app permissions_.

When the user submits the _login flow_, Meta redirects your app user to your redirect URI and sends an **authorization code**.

Your app can then exchange this **authorization code** for a short-lived ig user **access token**. An _ig-user-id_ for your _app-user_. And a _list of permissions_ the app user granted _your app_.

- Your app can exchanged this **short-lived acccess token** for a **long-lived access token** tha is valid for a 60 days.

Authorization Window > Auth Code > Short-lived Access Token > Long-lived Access Token.

## Before you start

Add the Instagram Product to your app and configure your **Business Login Settings** in the Meta App Dashboard.

## Embed the business login URL

You should have completed this step during Instagram app setup in the App Dashboard, but if not,

1. Copy the **Embed URL** from the **Set up Business Login** in the App Dashboard.
2. Paste the URL in an anchor tag or button on your app or website to launch the login flow.

### API setup with Instagram Login

App users log in with their Instagram credentials.

To customize the Ig use case so that your app uses Business Login for Ig to log users in to your app, select **API setup with Ig login** in the left side menu.

The app name, Instagram app ID, and Instagram App Secret are shown and can be used for test API calls.

1. Click **Add al requirements permissions.** The _instagram_business_basic_ and _instagram_business_manage_messages_ premissions are required for this functionality and added by default.

2. In the **Generate Access Tokens** section click **Add account**.

3. Click **Continue** and log in to your ig account in the popup window.

4. Click **save** and **got it** to return to the App Dashboard.

5. In the **Configure webhooks** section, add your **Callback URL** and **Verify Token** to configure webhooks or use services that help you set up an endpoint.

6. Click **Verify and save**. The verification must be successful to subscribe to webhooks fields.

7. In the **Configure Webhooks** section, subscribe to available Instagram webhooks.

8. Click **set up** in the **Set up Instagram business login**.

9. Add your **Redirect URL** and click **save**.

10. Click **Business Login Settings** and add your _Deauthorization callback url_ and _data deletion request URL_ and click _save_. You can also add additional redirects URIs.

11. If you are ready to submit your app for review, click **Go to app review** in the **Complete App Review** section. This is only required if you are creating solutions for clients.

### API integration helper

The API Integration Helper allows you to send a test message using the Instagram API. Only available for apps that use Business Login for Instagram.

### OAuth token storage and management

Short answer: treat the query string `code` as an authorization code only (never store it client-side).

Exchange it on the server for a short-lived access token, and then exchange that for a long-lived access token.

Persist the long token + expiry + profile in your server DB, and set an HttpOnly session cookie (session id) so the browser can be redirected to the dashboard without exposing tokens.

1. Receive `code` server-side (on your redirect path).

2. Server exchanges code => short-lived token. Response contains `access_token` and `expires_in`.

3. Immediately exchange short-lived => long-lived. Response contains `access_token` (long) and `expires_in`.

4. Fetch profile (/me?fields=id,name) with the long token to get user id, name.

5. Persist server-side (in your lib/db.ts or real DB).
   - store record: {id, name, access_token, expires_at}
   - do NOT persist the auth `code`

6. Create a session cookie for the browser:
   - Option A: set an HttpOnly cookie with a session `id` or `user_id`. Then your APIs read that cookie and load the token from DB.

7. Redirect user to `/dashboard`. The dashboard calls your server API. Which reads the cookie, looks up the user record in DB, and returns profile data - frontend never holds raw tokens.

### When to refresh

- Long-lived tokens typically last ~60 days. Refresh when `expires_at - now < threshold`
- Refresh strategies:
- If refresh fails or user revoked access, require re-auth (redirect to OAuth start).
-

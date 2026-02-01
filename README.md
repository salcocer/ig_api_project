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

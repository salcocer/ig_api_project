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

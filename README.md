# Instagram API with Instagram Login 

The API can be used to:

-   Content publishing. Get and publish their media. 
-   Messaging. Send and Receive messages with customers or people
interested in their IG account.

This API setup does not require a Facebook Page to be linked to the 
Instagram account. 

To ensure consistency between scope values and permission names, we are 
introducing new scope values for the Instagram API with Instagram login.

The new scope values are: 

-   *instagram_business_basic*
-   *instagram_business_content_publish*
-   *instagram_business_manage_messages*
-   *instagram_business_manage_comments*

These will replace the existing *business_basic*, *business_content_publish*,
*business_manage_comments* and *business_manage_messages* scope values.

# Business Login for Instagram

Business Login is a custom login flow that allows your app to ask for 
permissions to access your app user's Instagram professional account
data and to get an access token to use in your app's API requests. 

To ensure consistency between scope values and permission names, we are 
introducing new scope values for the Instagram API with Instagram login. 
The new scope values are: 

-   *instagram_business_basic*
-   *instagram_business_content_publish*
-   *instagram_business_manage_messages*
-   *instagram_business_manage_comments*

These will replace the existing:
-   *business_basic*
-   *business_content_publish*
-   *business_manage_comments*
-   *business_manage_messages*

## How it works 

Your app user launches the login flow on your or website by clicking your
embed URL link or button. 

This embed URL that you set up in the App Dashboard with the permissions 
you are requesting from your app user, opens an authorization window.  

Your app user uses this window to grant your app permissions. 

When the user submits the login flow, Meta redirects your app user to your
redirect URI and sends an authorization code. Your app can then exchange
this authorization code for a short-lived Instagram User access token,
an Instagram-scoped user ID for your app user, and a list of permissions 
the app user granted your app. 

Your app can exchanged this short-lived acccess token for a long-lived 
Instagram user access token that is valid for 60 days. 



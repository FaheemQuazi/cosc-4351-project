# cosc-4351-project
UH COSC 4351 Project - Faheem Quazi, Johnson Tran, Bozheng Liu

## Overview

Project we had to make for class. Basically a "home page" style portal that would link to different company assets.

## Setup Instructions

This app was designed with Auth0 for authentication. The following environment variables need to be set for login to be functional:
The values intended to be used with this app have been omitted for security.

```
COSC_AUTH0_CLIENT_ID - Client ID for Auth0
COSC_AUTH0_CLIENT_SECRET - Client Secret for Auth0
COSC_AUTH0_DOMAIN - Auth0 Domain
```

If you are not deploying this on Vercel or GitPod, you'll also need to set the `COSC_DOMAIN` variable to the URL that is used to access the root of the server i.e. `https://localhost:3000` (notice the lack of a forward slash at the end).
If you are deploying this on vercel, ensure the `VERCEL_URL` system variable is set.


Also, ensure you have the following rule set up in Auth0: 

```
function (user, context, callback) {
  if (context.authorization !== null && context.authorization.roles !== null) {
    context.idToken['https://any-namespace/roles'] = context.authorization.roles;
    context.accessToken['https://any-namespace/roles'] = context.authorization.roles;
  }
  return callback(null, user, context);
}
```
# cosc-4351-project
UH COSC 4351 Project - Faheem Quazi, Johnson Tran, Bozheng Liu

## Overview

Project we had to make for class. Basically a "home page" style portal that would link to different company assets. We also added the ability for users with the `ADMIN` role to have access to a Link Manager which dynamically adds/removes/modifies links in the system.

## Try it!

Head over to [https://cosc-4351-project.vercel.app](https://cosc-4351-project.vercel.app/) to try out the latest deployment. Log in with the following:
- Usernames: `hruser@contoso.com`, `adminuser@contoso.com`
- Password: `Test1ng.123`

## Technologies Used

- Backend
    - [Node.JS](https://nodejs.org): Core
    - [Express](https://expressjs.com): Web Framework
    - [PassportJS](http://www.passportjs.org/): SSO Handler
    - [Auth0](https://auth0.com/): SSO/Authentication Provider
    - [lowdb](https://github.com/typicode/lowdb): Link Storage
- Frontend
    - [ejs](https://ejs.co/): Template Engine
    - Good ol' HTML/CSS
- DevOps
    - [GitPod](https://gitpod.io): One-click dev environments
    - [GitHub Issues](https://github.com/FaheemQuazi/cosc-4351-project/issues?q=): Task Tracking / Collaboration
    - [Vercel](https://vercel.com/): Continuous/Automated Deployment

## Setup Instructions

### Basics

1. Install NodeJS (we tested on v12.19.0) and Git
2. Clone this repository: `git clone https://github.com/FaheemQuazi/cosc-4351-project.git`
3. Open a terminal and change directory to wherever you cloned the repository
4. run: `npm install` - this installs all dependencies required for the server
5. Set environment variables (as defined in [the section below](#environment-variables))
6. run: `npm start` - The server should be accessible at port 3000.

### Environment Variables

This app was designed with Auth0 for authentication. The following environment variables need to be set for login to be functional:
The values intended to be used with this app have been omitted for security.

```
COSC_AUTH0_CLIENT_ID - Client ID for Auth0
COSC_AUTH0_CLIENT_SECRET - Client Secret for Auth0
COSC_AUTH0_DOMAIN - Auth0 Domain
COSC_CALLBACK_URL - domain of deployment (see note below)
```

**Note:** If you are not deploying this on Vercel or GitPod, you'll need to set the `COSC_CALLBACK_URL` variable to the URL that is used to access the root of the server i.e. `https://localhost:3000` (notice the lack of a forward slash at the end).
If you are deploying this on vercel, ensure the `VERCEL_URL` system variable is set.
If you are deploying this on GitPod, no additional setup is required.

### Auth0

Ensure you have the following rule set up in Auth0: 

```
function (user, context, callback) {
  if (context.authorization !== null && context.authorization.roles !== null) {
    context.idToken['https://any-namespace/roles'] = context.authorization.roles;
    context.accessToken['https://any-namespace/roles'] = context.authorization.roles;
  }
  return callback(null, user, context);
}
```


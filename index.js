/**
 * index.js: Main File
 * 
 * Faheem Quazi
 */
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const jsonwebtoken = require('jsonwebtoken');

var app = express();

/* Configure ExpressJS */
app.use(express.static(path.join(__dirname, '/public'))); // Static CSS/JS/image resources that should always be accessible
app.set('view engine', 'ejs'); // Set the template engine
app.set('views', path.join(__dirname, 'views')); // Set the path to grab views
app.use(session({secret: "itsnotreallyasecretifitsopensource"})); // Session Management

/* Set up app URL */
var appURL = require('./appURL')();
console.log("Server URL:", appURL);

/* Configure Auth0 */
var strategy = new Auth0Strategy(
  {
    domain: process.env["COSC_AUTH0_DOMAIN"],
    clientID: process.env["COSC_AUTH0_CLIENT_ID"],
    clientSecret: process.env["COSC_AUTH0_CLIENT_SECRET"],
    callbackURL: appURL + "/auth/callback"
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    var decoded = jsonwebtoken.decode(extraParams.id_token);
    profile.permissions = decoded['https://any-namespace/roles'];
    return done(null, profile);
  }
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

/* App Routes */
app.use('/auth', require('./routes/auth'));
app.use('/portal', require('./routes/portal'));

/* Base Route */
app.get('/', (req, res)=>{
    res.render('home', {
        appURL: appURL
    });
});

/* Start */
app.listen(3000, ()=>{
    console.log("Started! Listening on Port 3000");
})
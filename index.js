// Owner: Faheem Quazi

const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const jsonwebtoken = require('jsonwebtoken');

var app = express();

/* Configure ExpressJS */
app.use(express.static('./public')); // Static CSS/JS/image resources that should always be accessible
app.set('view engine', 'ejs'); // Set the template engine
app.set('views', path.join(__dirname, 'views')); // Set the path to grab views
app.use(session({secret: "itsnotreallyasecretifitsopensource"})); // Session Management

/* Configure Auth0 */
var strategy = new Auth0Strategy(
  {
    domain: "cosc4351test.us.auth0.com",
    clientID: "Un2Bbm95YSh9Pn36ISwf6ll1er2p8aH1",
    clientSecret: "doIQHnhqlTTO9OrrzPgDfL4afX3GOKgO8Ov2z4Da6ZvltWNz3E-2Em_swg6KNZgx",
    callbackURL: 'https://3000-e21fd409-0c6b-4747-bd22-5e16bdb8afff.ws-us02.gitpod.io/auth/callback'
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
    res.render('home');
});

/* Start */
app.listen(3000, ()=>{
    console.log("Started! Listening on Port 3000");
})
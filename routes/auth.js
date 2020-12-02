/**
 * auth.js : Authentication Router
 * - Handles Auth Routes and role acquisition from auth0
 * 
 * Faheem Quazi
 */

const routes = require('express').Router();
const passport = require('passport');
const querystring = require('querystring');
var appURL = require('./../appURL')();

routes.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

routes.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/auth/login'); }
        req.logIn(user, function (err) {
            console.log("User", user.displayName, "logged in with roles", user.permissions);
            res.redirect('/portal/home');
        });
    })(req, res, next);
});

routes.get('/logout', (req, res) => {
    console.log("User", req.user.displayName, "logged out");
    req.logout();

    var returnTo = appURL
    var logoutURL = new URL(
        ("https://" + process.env["COSC_AUTH0_DOMAIN"] + "/v2/logout")
    );
    logoutURL.search = querystring.stringify({
        client_id: process.env["COSC_AUTH0_CLIENT_ID"],
        returnTo: returnTo
    });

    res.redirect(logoutURL);
});

module.exports = routes;
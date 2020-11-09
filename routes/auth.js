// Owner: Faheem Quazi

const routes = require('express').Router();
const passport = require('passport');
const querystring = require('querystring');

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
            console.log(user);
            res.redirect('/portal/home');
        });
    })(req, res, next);
});

routes.get('/logout', (req, res) => {
    req.logout();

    var returnTo = "https://3000-e21fd409-0c6b-4747-bd22-5e16bdb8afff.ws-us02.gitpod.io"
    var logoutURL = new URL(
        "https://cosc4351test.us.auth0.com/v2/logout"
    );
    logoutURL.search = querystring.stringify({
        client_id: "Un2Bbm95YSh9Pn36ISwf6ll1er2p8aH1",
        returnTo: returnTo
    });

    res.redirect(logoutURL);
});

module.exports = routes;
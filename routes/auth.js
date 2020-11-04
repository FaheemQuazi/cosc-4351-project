// Owner: Faheem Quazi

const routes = require('express').Router();

routes.get('/login', (req, res) => {
    if (req.session['loggedIn'] == true) {
        res.redirect('/auth/success');
    } else { 
        // TODO: Add SSO middleware
        res.send('login');
    }
});

routes.get('/success', (req, res) => {
    // TODO: Redirect to portal home or admin based on user type
    req.session['loggedIn'] = true;
    res.send('post login (login successful)');
});

routes.get('/err', (req, res) => {
    req.session['loggedIn'] = false;
    res.send('post login (login failed)');
});

routes.get('/logout', (req, res) => {
    req.session['loggedIn'] = false;
    res.redirect('/');
});

module.exports = routes;
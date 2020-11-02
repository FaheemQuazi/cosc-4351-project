// Owner: TBD

const routes = require('express').Router();

routes.get('/home', (req, res) => {
    if (req.session['loggedIn'] == true) {
        res.send('home route portal');
    } else {
        res.send('not logged in');
    }
});

routes.get('/admin', (req, res) => {
    if (req.session['loggedIn'] == true && req.session['admin'] == true) {
        res.send('admin route portal');
    } else {
        res.send('not logged in or not admin');
    }
});

module.exports = routes;
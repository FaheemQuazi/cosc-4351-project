// Owner: TBD

const routes = require('express').Router();

routes.get('/home', (req, res) => {
    console.log(req.user);
    if (req.user) {
        if(req.user.permissions.includes('ADMIN')) {
            res.render('admin', {
                name: req.user.displayName
            });
        } else {
            res.render('portal', {
                name: req.user.displayName,
                roles: req.user.permissions
            });
        }
    } else {
        res.send('not logged in');
    }
});

module.exports = routes;
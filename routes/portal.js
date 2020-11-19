// Owner: Faheem Quazi

const routes = require('express').Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../links.json'));
const db = low(adapter);

db.defaults({"links": []});

routes.get('/home', (req, res) => {
    if (req.user) {
        var links = db.read().get('links').filter(link => req.user.permissions.includes(link.role)).value();
        res.render('portal', {
            name: req.user.displayName,
            roles: req.user.permissions,
            links: links
        });
    } else {
        res.send('not logged in');
    }
});

module.exports = routes;
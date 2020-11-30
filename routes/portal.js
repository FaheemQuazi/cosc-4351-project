// Owner: Faheem Quazi

const routes = require('express').Router();
const low = require('lowdb');
const localDB = require('../db/localdb');
const path = require('path');
const uuid = require('uuid');

const adapter = new localDB(path.join(__dirname, '../db/links.json'));
const db = low(adapter);

db.defaults({"links": []});

if (db.read().get('links').value() !== undefined) {
    db.set('links', db.read().get('links').value().forEach((x)=> {
        if (!uuid.validate(x.id)) {
            x.id = uuid.v4();
        }
    }));
}

routes.get('/home', (req, res) => {
    if (req.user) {
        var links = db.read().get('links').filter(link => req.user.permissions.includes(link.role)).value();
        res.render('portal', {
            name: req.user.displayName,
            roles: req.user.permissions,
            links: links
        });
    } else {
        res.redirect('/');
    }
});

routes.get('/admin/*', (req, res, next) => {
    if (req.user) {
        if (req.user.permissions.includes('ADMIN')) {
            next();
        } else {
            res.status(403).send('permission denied. must be ADMIN. <a href="/portal/home">Back To Portal</a>');
        }
    } else {
        res.redirect('/');
    }
})

routes.get('/admin/add', (req, res) => {

    db.get('links').push({
        "name": req.query.name,
        "role": req.query.role,
        "url": req.query.url,
        "id": uuid.v4()
    }).write();

    req.session.adminmsg = "OK: Successfully added link - " + req.query.name;
    res.redirect('/portal/admin');
});

routes.get('/admin/update', (req, res) => {

    db.get('links').find({
        id: req.query.id
    }).assign({
        "name": req.query.name,
        "role": req.query.role,
        "url": req.query.url
    }).write();

    req.session.adminmsg = "OK: Successfully updated link - " + req.query.name;
    res.redirect('/portal/admin');
});

routes.get('/admin/delete', (req, res) => {
    db.get('links').remove({
        id: req.query.id
    }).write();

    req.session.adminmsg = "OK: Successfully removed link - " + req.query.name;
    res.redirect('/portal/admin');
});

routes.get('/admin', (req, res) => {
    if (req.user) {
        if (req.user.permissions.includes('ADMIN')) {
            var links = db.read().get('links').sortBy('role').value();
            var msg = req.session.adminmsg;
            req.session.adminmsg = undefined;
            res.render('admin', {
                name: req.user.displayName,
                roles: req.user.permissions,
                links: links,
                msg: msg
            });
        } else {
            res.send('permission denied. must be ADMIN. <a href="/portal/home">Back To Portal</a>');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = routes;
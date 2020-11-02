// Owner: Faheem Quazi

var express = require('express');
var session = require('express-session');
var path = require('path');

var app = express();

/* Configure ExpressJS */
app.use(session({secret: "itsnotreallyasecretifitsopensource"})); // Session Management
app.use(express.static('./public')); // Static CSS/JS/image resources that should always be accessible
app.set('view engine', 'ejs'); // Set the template engine
app.set('views', path.join(__dirname, 'views')); // Set the path to grab views

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
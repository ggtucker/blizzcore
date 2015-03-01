var config = require('./config.js');

var express = require('express');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');

var mongoose = require('mongoose');
require('./lib/models/UserModel');
mongoose.connect(config.mongo.dbUrl);

var security = require('./lib/security');

var app = express();

// Redirect HTTP to HTTPS
app.use(function(req, res, next) {
    if(!req.secure) {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});

app.use(logger('dev'));

// Set up static routes
require('./lib/routes/static').addRoutes(app, config);

// Initialize bnet passport security

security.initialize(config.bnet.id, config.bnet.secret, config.bnet.scopes, config.bnet.callback);

// configure Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "blizzcore",
    saveUninitialized: true,
    resave: true,
    cookie : { httpOnly: true, maxAge: 2419200000 }
}));

// Initialize passport, and add support for persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

require('./lib/routes/auth').addRoutes(app, security);
require('./lib/routes/users').addRoutes(app);
require('./lib/routes/appFile').addRoutes(app, config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});


module.exports = app;

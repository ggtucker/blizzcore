var express = require('express');
var favicon = require('serve-favicon');
var compress = require('compression');

exports.addRoutes = function(app, config) {
	// Serve up the favicon
	//app.use(favicon(config.server.distFolder + '/favicon.ico'));

	// First looks for a static file: index.html, css, images, etc.
	app.use(config.server.staticUrl, compress());
	app.use(config.server.staticUrl, express.static(config.server.distFolder));
	app.use(config.server.staticUrl, function(req, res, next) {
		res.sendStatus(404); // If we get here then the request for a static file is invalid
	});
};
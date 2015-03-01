var UserService = require('../services/UserService');
//var CommunityService = require('../services/CommunityService');

module.exports.addRoutes = function(app) {

	// User Collection Endpoints

	app.get('/users', function(req, res, next) {
		UserService.getAll(function(err, users) {
			if(err) { return next(err); }
			res.json(users);
		});
	});

	app.post('/users', function(req, res, next) {
		UserService.create(req.body, function(err, user) {
			if(err) { return next(err); }
			res.json(user);
		});
	});

	// User Endpoints

	app.get('/users/:user', function(req, res) {
		res.json(req.user);
	});

	app.get('/users/:user/communities', function(req, res) {
		//CommunityService
		res.json({});
	});

	// Parameters

	app.param('user', function(req, res, next, id) {
		UserService.getById(id, function(err, user) {
			if(err) { next(err); }

			req.user = user;
			return next();
		});
	});

};
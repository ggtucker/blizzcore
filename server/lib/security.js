var express = require('express');
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var UserService = require('./services/UserService');
var app = express();

var filterUser = function(user) {
	if(user) {
		return {
			user: {
				battleId: user.battleId,
				battleTag: user.battleTag
			}
		};
	} else {
		return { user: null };
	}
}

var security = {
	initialize: function(clientId, clientSecret, scope, callbackUrl) {
		passport.serializeUser(function(user, done) {
			done(null, user);
		});
		passport.deserializeUser(function(user, done) {
			done(null, user);
		});
		passport.use(
			new BnetStrategy({
				clientID: clientId,
				clientSecret: clientSecret,
				scope: scope,
				callbackURL: callbackUrl
			},
			function(accessToken, refreshToken, profile, done) {
				process.nextTick(function() {
					return done(null, profile);
				});
			})
		);
	},
	authenticationRequired: function(req, res, next) {
		console.log('authRequired');
		if (req.isAuthenticated()) {
			next();
		} else {
			res.status(401).json(filterUser(req.user));
		}
	},
	adminRequired: function(req, res, next) {
		console.log('adminRequired');
		if (req.user && req.user.admin ) {
			next();
		} else {
			res.status(401).json(filterUser(req.user));
		}
	},
	sendCurrentUser: function(req, res, next) {
		res.status(200).json(filterUser(req.user));
		res.end();
	},
	login: function(req, res, next) {
		function authenticationFailed(err, userInfo, info){
			if (err) { return next(err); }
			if (!userInfo) { return res.json(filterUser(userInfo)); }

			var user = {
				battleId: userInfo.id,
				battleTag: userInfo.battletag
			};

			// Save the user who just logged in
			UserService.create(user, function(err, user) {
				if (err) { return next(err); }
			});

			// Log the user in
			req.login(user, function(err) {
				if ( err ) { return next(err); }
				return res.redirect('/#/home');
			});
		}
		return passport.authenticate('bnet', authenticationFailed)(req, res, next);
	},
	logout: function(req, res, next) {
		req.logout();
		res.sendStatus(204);
	}
};

module.exports = security;
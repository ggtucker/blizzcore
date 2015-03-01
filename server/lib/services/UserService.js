var UserModel = require('mongoose').model('UserModel');

var UserService = {};

// callback args: err, users
UserService.getAll = function(callback) {
	UserModel.find(function(err, users) {
		callback(err, users);
	});
};

// callback args: err, user
UserService.create = function(userInfo, callback) {
	var user = new UserModel(userInfo);
	this.getByBattleId(userInfo.battleId, function(err, existingUser) {
		if(!existingUser) {
			user.save(function(err, newUser) {
				callback(err, newUser);
			});
		} else {
			callback(err, existingUser);
		}
	});
};

// callback args: err, user
UserService.getByBattleId = function(id, callback) {
	UserModel.findOne({battleId: id}, function(err, user) {
		if(!user) { err = new Error('Can\'t find user with battleId ' + id); }
		callback(err, user);
	});
};

// callback args: err, user
UserService.getById = function(id, callback) {
	var query = UserModel.findById(id);
	query.exec(function(err, user) {
		if(!user) { err = new Error('Can\'t find user with id ' + id); }
		callback(err, user);
	});
};

module.exports = UserService;
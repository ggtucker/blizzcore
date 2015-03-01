bcore.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('users', {
		url: '/users',
		templateUrl: 'static/app/users/users.html',
		controller: 'UserController',
		resolve: {
			usersPromise: ['users', function(users) {
				return users.getAll();
			}]
		}
	});
}]);

bcore.controller('UserController', ['$scope', 'users', function($scope, users) {
	$scope.users = users.users;
}]);

bcore.factory('users', ['$http', function($http) {
	var o = {
		users: []
	};

	o.getAll = function() {
		return $http.get('/users').success(function(data) {
			angular.copy(data, o.users);
		});
	};

	o.get = function(id) {
		return $http.get('/users/' + id).then(function(res) {
			return res.data;
		});
	};

	o.create = function(user) {
		return $http.post('/users', user).success(function(data) {
			o.users.push(data);
		});
	};

	o.getCommunities = function(id) {
		return $http.get('/users/' + id + '/communities').then(function(res) {
			return res.data;
		});
	};

	/*o.upvote = function(post) {
		return $http.put('/users/' + post._id + '/upvote').success(function(data) {
			post.upvotes = data.upvotes;
		});
	};

	o.addComment = function(id, comment) {
		return $http.post('/users/' + id + '/comments', comment);
	};

	o.upvoteComment = function(post, comment) {
		return $http.put('/users/' + post._id + '/comments/' + comment._id + '/upvote').success(function(data) {
			comment.upvotes = data.upvotes;
		});
	};*/

	return o;
}]);
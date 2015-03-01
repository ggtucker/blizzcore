bcore.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('profile', {
		url: '/profile',
		templateUrl: 'static/app/profile/profile.html',
		controller: 'ProfileController',
		resolve: {}
	});
}]);

bcore.controller('ProfileController', ['$scope', function($scope) {
	$scope.text = 'ProfileController';
}]);
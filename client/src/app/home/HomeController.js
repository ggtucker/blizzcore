bcore.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'static/app/home/home.html',
		controller: 'HomeController',
		resolve: {}
	});
}]);

bcore.controller('HomeController', ['$scope', function($scope) {
	$scope.text = 'Home';
}]);
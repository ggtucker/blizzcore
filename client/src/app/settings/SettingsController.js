bcore.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('settings', {
		url: '/settings',
		templateUrl: 'static/app/settings/settings.html',
		controller: 'SettingsController',
		resolve: {}
	});
}]);

bcore.controller('SettingsController', ['$scope', function($scope) {
	$scope.text = 'SettingsController';
}]);
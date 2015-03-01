var bcore = angular.module('bcore', ['ui.router', 'ui.bootstrap', 'ngCookies']);

bcore.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('home');
}]);
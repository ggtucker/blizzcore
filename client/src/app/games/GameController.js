bcore.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('warcraft', {
			url: '/warcraft',
			templateUrl: 'static/app/games/game.html',
			controller: 'GameController',
			resolve: {
				gamePromise: ['currentGame', function(currentGame) {
					currentGame.gameId = 'warcraft';
				}]
			}
		})

		.state('starcraft', {
			url: '/starcraft',
			templateUrl: 'static/app/games/game.html',
			controller: 'GameController',
			resolve: {
				gamePromise: ['currentGame', function(currentGame) {
					currentGame.gameId = 'starcraft';
				}]
			}
		})

		.state('diablo', {
			url: '/diablo',
			templateUrl: 'static/app/games/game.html',
			controller: 'GameController',
			resolve: {
				gamePromise: ['currentGame', function(currentGame) {
					currentGame.gameId = 'diablo';
				}]
			}
		})

		.state('hearthstone', {
			url: '/hearthstone',
			templateUrl: 'static/app/games/game.html',
			controller: 'GameController',
			resolve: {
				gamePromise: ['currentGame', function(currentGame) {
					currentGame.gameId = 'hearthstone';
				}]
			}
		})

		.state('overwatch', {
			url: '/overwatch',
			templateUrl: 'static/app/games/game.html',
			controller: 'GameController',
			resolve: {
				gamePromise: ['currentGame', function(currentGame) {
					currentGame.gameId = 'overwatch';
				}]
			}
		});
}]);

bcore.controller('GameController', ['$scope', 'currentGame', function($scope, currentGame) {
	$scope.currentGame = currentGame;
}]);

bcore.factory('currentGame', [function() {
	return {};
}]);
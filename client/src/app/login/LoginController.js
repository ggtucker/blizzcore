bcore.controller('LoginController', ['$http', '$scope', function($http, $scope) {
	$scope.refresh = function() {
		$http.get('/current-user').then(function(res) {
			var user = res.data.user;
			if(user) {
				$scope.user = user;
			} else {
				$scope.user = false;
			}
		});
	};

	$scope.logout = function() {
		$http.get('/logout').then(function(res) {
			if(res.status == 204) {
				$scope.user = false;
			}
		});
	}
}]);
bcore.controller('LanguageDropdownController', ['$scope', function ($scope) {
	$scope.currentLanguage = 'English';
	$scope.languages = [
		'English',
		'Español',
		'Français'
	];
}]);
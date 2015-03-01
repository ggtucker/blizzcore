bcore.controller('CommunityDropdownController', ['$scope', function ($scope) {
	$scope.userCommunities = [
		{ name: 'Community 1', link: '#/communities/community1' },
		{ name: 'Community 2', link: '#/communities/community2' },
		{ name: 'Community 3', link: '#/communities/community3' }
	];
}]);
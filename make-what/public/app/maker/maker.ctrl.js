'use strict';

angular.module('make-what')
	.controller('MakerCtrl', ['$scope','$http', '$location', 'apiUrl', 'RootFactory', 'UserFactory',

		function($scope, $http, $location, apiUrl, RootFactory, UserFactory){
			$scope.heading = 'maker page. see saved projects here.';

			$scope.projects = null;

			$scope.root = null;

			$scope.currentUser = null;

			console.log("thisUser", RootFactory.credentials.user)

			RootFactory.getApiRoot()
				.then(
					// Store root, get projects
					root => {
						$scope.root = root;
						return $http.get($scope.root.projects)
					}, console.error
				).then(
					// Store projects
					res => $scope.projects = res.data, console.error
				);

			$scope.currentUser = UserFactory.getUser();


		}
	]);

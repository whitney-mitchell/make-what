'use strict';

angular.module('make-what')
	.controller('MakerCtrl', ['$scope','$http', '$location', 'apiUrl', 'RootFactory', 'UserFactory',

		function($scope, $http, $location, apiUrl, RootFactory, UserFactory){

			$scope.projects = null;
			$scope.root = null;

			// Get logged in user for use in saving projects to ToMake list
			$scope.currentUser = UserFactory.getUser();
			console.log("currentUser", $scope.currentUser);

			RootFactory.getApiRoot()
				.then(
					// Store root, get projects
					root => {
						$scope.root = root;
						return $http.get($scope.root.projects)
					}, console.error
				).then(
					// Store projects
					res => {
						$scope.projects = res.data, console.error
						console.log("$scope.projects", $scope.projects)
						console.log("$scope.projects[0]", $scope.projects[0])
						console.log("$scope.projects[0].maker_project[0]", $scope.projects[0].maker_project[0])
						console.log("$scope.projects[0].maker_project[0].maker", $scope.projects[0].maker_project[0].maker)
						console.log("$scope.projects[0].maker_project[0].maker.username", $scope.projects[0].maker_project[0].maker.username)
					}

				).then(
					// Compare currentUser against API's makersprojects,
					// accessed through projects.
					(projects, currentUser) => {
						$scope.makerProjectMatches = []
						console.log("currentUser.username", $scope.currentUser.username);
						for (var h=0; h < $scope.projects.length; h++) {

							for (var i=0; i < $scope.projects[h].maker_project.length; i++) {

									if ($scope.projects[h].maker_project[i].maker.username == $scope.currentUser.username) {
										$scope.makerProjectMatches.push($scope.projects[h])

								}
							}
						}
						console.log('makerProjectMatches', $scope.makerProjectMatches);
					});




		}
	]);

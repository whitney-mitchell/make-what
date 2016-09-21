'use strict';

angular.module('make-what')
	.controller('MakerCtrl', ['$scope','$http', '$location', '$route', 'apiUrl', 'RootFactory', 'UserFactory',

		function($scope, $http, $location, $route, apiUrl, RootFactory, UserFactory){

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
									$scope.projects[h].maker_project_id = $scope.projects[h].maker_project[i].id
									console.log("$scope.projects[h].maker_project[i].id", $scope.projects[h].maker_project[i].id);
									$scope.makerProjectMatches.push($scope.projects[h])

								}
							}
						}
						console.log('makerProjectMatches', $scope.makerProjectMatches);
					});

			// Delete project from user's ToMake list
			$scope.deleteToMake = (project) => {
				$http.defaults.headers.common.Authorization = 'Basic ' + RootFactory.credentials();

				// Find the project in makerProjectMatches array that matches the project being deleted,
				// Remove it, so displayed ToMake list reflects the project's deletion from the makersProjects database
				// for (var i = 0; i < $scope.makerProjectMatches.length; i++) {
				// 	console.log("$scope.makerProjectMatches[i]", $scope.makerProjectMatches[i])
				// 	// if ($scope.makerProjectMatches[i].maker_project.length !=0) {
				// 		for (var j = 0; j < $scope.makerProjectMatches[i].maker_project.length; j++) {
				// 			console.log("$scope.makerProjectMatches[i].maker_project[j]", $scope.makerProjectMatches[i].maker_project[j]);
				// 			console.log("$scope.makerProjectMatches[i].maker_project[j].id", $scope.makerProjectMatches[i].maker_project[j].id);

				// 			if ($scope.makerProjectMatches[i].maker_project[j].id = project.maker_project_id) {
				// 				$scope.makerProjectMatches.splice($scope.makerProjectMatches[i])

				// 			}
				// 		}
				// 	// }
				// }

				$http({
					url: `${apiUrl}/makersprojects/${project.maker_project_id}/`,
					method: "DELETE"

				})
				.success(res => $route.reload())
				.error(() => window.alert('Something went wrong, try again.'));
			}


		}
	]);

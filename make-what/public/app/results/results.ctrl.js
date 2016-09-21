'use strict';


angular.module('make-what')
	.controller('ResultsCtrl', ['$scope','$http', '$location','$timeout', '$routeParams', 'apiUrl', 'RootFactory', 'UserFactory',

		function($scope, $http, $location, $timeout, $routeParams, apiUrl, RootFactory, UserFactory){

			$scope.heading = 'results!'
			console.log("$routeParams.selectSupplies", $routeParams.selectSupplies);
			$scope.selectedSupplies = [];
			// Make user-typed supplies lowercase
			if (typeof($routeParams.selectSupplies) === "string") {
				$scope.selectedSupplies.push($routeParams.selectSupplies.toLowerCase())
			} else {
				for (var i=0; i < $routeParams.selectSupplies.length; i++) {
						$scope.selectedSupplies.push($routeParams.selectSupplies[i].toLowerCase())
				}
			}

			// Make search parameters accessible in results controller
			// $scope.selectedSupplies = sortedSupplies;
			$scope.selectedTypes = $routeParams.selectTypes;
			console.log("Supplies and types arrays", $scope.selectedSupplies, $scope.selectedTypes);

			$scope.projects = null;
			$scope.root = null;

			$scope.currentUser = null;

			// Get root API, then get all the data needed for this view's functionality.
			RootFactory.getApiRoot()
				.then(
					// Store root, and get projects to display in Featured
					root => {
						$scope.root = root;
						return $http.get(root.projects)
					}, console.error
				)
				.then(
					// Then, store projects and get types
					res => {
						$scope.projects = res.data, console.error
						// console.log("$scope.projects", $scope.projects)
						// console.log("$scope.projects[0]", $scope.projects[0])
						// console.log("$scope.projects[0].supply_project[0].supply.name", $scope.projects[0].supply_project[0].supply.name)
					}
				)
				.then(
					// Compare selectedSupplies against API projects' supplies,
					// then bring back all matching projects.
					(projects, selectedSupplies) => {
						$scope.projectMatches = []
						for (var h=0; h < $scope.selectedSupplies.length; h++) {

							for (var i=0; i < $scope.projects.length; i++) {

								for (var j=0; j < $scope.projects[i].supply_project.length; j++) {

									if ($scope.projects[i].supply_project[j].supply.name === $scope.selectedSupplies[h]) {
										$scope.projectMatches.push($scope.projects[i])

									}
								}
							}
							console.log('projectMatches', $scope.projectMatches)
						}
					}
				);

			// Get logged in user for use in saving projects to ToMake list
			$scope.currentUser = UserFactory.getUser();
			console.log("currentUser", $scope.currentUser);

			// Add project to user's ToMake list
			$scope.saveToMake = (project, currentUser) => {
				console.log("project", project );
				console.log('currentUser', currentUser)

				if (currentUser !== null) {
					// Set the authorization headers on the request
					// After equal sign below, this is the Base 64 string built in app.js
					$http.defaults.headers.common.Authorization = 'Basic ' + RootFactory.credentials();

					$http({
						url: `${apiUrl}/makerproj`,
						method: "POST",
						data: {
							"username": currentUser.username,
							"id": project.id
						}
					})
					.success(res => $location.path('/maker'))
					.error(() => window.alert('Please log in to save projects.'));
				} else {
					window.alert('Please log in to save projects.');
					$location.path('/login');
				}
			}
		}
	]);

angular.module('make-what')
	.controller('ResultsCtrl', ['$scope','$http', '$timeout', '$routeParams', 'apiUrl', 'RootFactory',

		function($scope, $http, $timeout, $routeParams, apiUrl, RootFactory){

			// Make user-typed supplies lowercase
			var sortedSupplies = [];
			for (var i=0; i < $routeParams.selectSupplies.length; i++) {
				sortedSupplies.push($routeParams.selectSupplies[i].toLowerCase());
			}

			// Make search parameters accessible in results controller
			$scope.heading = 'results!'
			$scope.selectedSupplies = sortedSupplies;
			$scope.selectedTypes = $routeParams.selectTypes;
			console.log("routeParams", $scope.selectedSupplies, $scope.selectedTypes);

			$scope.projects = null;
			$scope.root = null;

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



			}



			// (supplies, selectedSupplies) => {
				// for (var i = 0; i <= selectedSupplies.length; i+=1)
					// for (var j = 0; j <= supplies.length; j+=1)
						// if supplies[j].name === selectSupplies[i]
							// suppliesMatch = supplies[j].name;
							// return suppliesMatch;
			// }

			// var matches = [],
			// i, j;
			// for (i=0; i < $scope.supplies.length; i++)
			// 	// console.log("supplies", $scope.supplies[i] );
			// 	if (-1 != (j = $scope.selectedSupplies.indexOf($scope.supplies[i].name.string)))
			// 		matches.push($scope.supplies[i]);
			// 	console.log("matches", matches);



			// $scope.suppliesSet = {};
			// for (var i = 0; i < $scope.selectedSupplies.length; i++) {
			// 	var e = $scope.selectedSupplies[i];
			// 	$scope.suppliesSet[e] = true;
			// };
			// console.log("supplies.length", $scope.supplies);
			// $scope.suppliesMatches = [];
			// for (var j = 0; j < $scope.supplies.length; j++) {
			// 	var f = $scope.supplies[j].name;
			// 	if ($scope.suppliesSet[f.string]) {
			// 		$scope.suppliesMatches.push(f);
			// 	}
			// };
			// console.log("$scope.supplies.length", $scope.supplies.length);
			// console.log("supMatch", $scope.suppliesMatches);
			// console.log("supSet", $scope.suppliesSet);



			// Compare selectedTypes against API Types
			// If match, check against API typesProjects
			// then bring back all matching projects.


	])

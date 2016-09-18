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
			$scope.supplies = null;
			$scope.types = null;
			$scope.suppliesProjects = null;
			$scope.typesProjects = null;

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
        		$scope.projects = res.data;
        		return $http.get($scope.root.types);
        	}, console.error
      	)
      	.then(
					// Then store types and get supplies
					res => {
						$scope.types = res.data;
						return $http.get($scope.root.supplies);
					}, console.error
				)
				.then(
					// Then store supplies and get typesprojects
					res => {
						$scope.supplies = res.data;
						return $http.get($scope.root.typesprojects);
						console.log("$scope.supplies", supplies)
					}, console.error
				)
				.then(
					// Then store typesprojects and get suppliesprojects
					res => {
						$scope.typesProjects = res.data;
						return $http.get($scope.root.suppliesprojects);
					}, console.error
				)
				.then(
						res => $scope.suppliesProjects = res.data, console.error
				);


			// Compare selectedSupplies against API supplies
			// If there's a match, check against API suppliesProjects,
			// then bring back all matching projects.

			// var matches = [],
			// i, j;
			// for (i=0; i < $scope.supplies; i++)
			// 	console.log("supplies", $scope.supplies[i] );
			// 	if (-1 != (j = $scope.selectedSupplies.indexOf($scope.supplies[i].name.string)))
			// 		matches.push($scope.supplies[i]);
			// 	console.log("matches", matches);


			// Create
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


			// (supplies, selectedSupplies) => {
				// for (var i = 0; i <= selectedSupplies.length; i+=1)
					// for (var j = 0; j <= supplies.length; j+=1)
						// if supplies[j].name === selectSupplies[i]
							// suppliesMatch = supplies[j].name;
							// return suppliesMatch;
			// }

			// Compare selectedTypes against API Types
			// If match, check against API typesProjects
			// then bring back all matching projects.



		}
	])
			// // Using services
			// $scope.selectSupplies = SuppliesService.getSupplies();
			// $scope.selectTypes = TypesService.getTypes();

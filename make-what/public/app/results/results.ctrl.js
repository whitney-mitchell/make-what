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
        ).then(
        	// Then, store projects and get types
        	res => {
        		$scope.projects = res.data;
        		return $http.get($scope.root.types);
        	}, console.error
      	).then(
					// Then store types and get supplies
					res => {
						$scope.types = res.data;
						return $http.get($scope.root.supplies);
					}, console.error
				).then(
					// Then store supplies and get typesprojects
					res => {
						$scope.supplies = res.data;
						return $http.get($scope.root.typesprojects);
					}, console.error
				).then(
					// Then store typesprojects and get suppliesprojects
					res => {
						$scope.typesProjects = res.data;
						return $http.get($scope.root.suppliesprojects);
					}, console.error
				).then(
						res => $scope.suppliesProjects = res.data, console.error
				);

			// Compare selectedSupplies against API supplies
			// If there's a match, check against API suppliesProjects,
			// then bring back all matching projects.



			// Compare selectedTypes against API Types
			// If match, check against API typesProjects
			// then bring back all matching projects.



		}
	])
			// // Using services
			// $scope.selectSupplies = SuppliesService.getSupplies();
			// $scope.selectTypes = TypesService.getTypes();

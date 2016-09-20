'use strict';

angular.module('make-what')
	.controller('MainCtrl', ['$scope','$http', '$location', '$timeout', 'apiUrl', 'RootFactory', 'UserFactory',

		function($scope, $http, $location, $timeout, apiUrl, RootFactory, UserFactory){
			$scope.projects = null;
			$scope.types = null;

			$scope.root = null;

			$scope.currentUser = null;

			$scope.selectedsupplies = null;
			$scope.selected_types = [];

			console.log("thisUser", $scope.user)

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
					// Then store types and get users
					res =>
						$scope.types = res.data, console.error
				);

			// Get logged in user for use in saving projects to ToMake list
				$scope.currentUser = UserFactory.getUser();
				console.log("currentUser", $scope.currentUser);



			// Deal with radio inputs for types, add each to array of selected_types
			$scope.add = function(type) {
				var index = $scope.selected_types.indexOf(type.name);
				if (index == -1 && type.selected) {
					$scope.selected_types.push(type.name);
				} else if (!type.selected && index != -1) {
					$scope.selected_types.splice(index, 1)
				}
			}

			// Send user search terms to results view
      $scope.search = function() {
      	$location.path('/results/').search({
      		selectSupplies: $scope.selected_supplies,
      		selectTypes: $scope.selected_types
      	})
      	console.log("supplies", $scope.selected_supplies)
      	console.log("types",$scope.selected_types)
      }

      // Add project to user's ToMake list
      $scope.saveToMake = (project, currentUser) => {
      	console.log("project", project );
      	// Set the authorization headers on the request
        // After equal sign below, this is the Base 64 string built in app.js
        $http.defaults.headers.common.Authorization = 'Basic ' + RootFactory.credentials();
        console.log('currentUser', currentUser)
        // $http({
        //   url: $scope.root.makersprojects,
        //   method: "POST",
        //   data: {
        //     "maker": $scope.currentUser.url,
        //     "project": $scope.selectedProject.url
        //   }
        // })
        // .success(res => res.success ? $location.path('/maker') : null)
        // .error(window.alert('Please log in to save projects.'));
      }

		}
	]);
			//Use Services

			// $scope.addSupply = function(selected_supplies) {
			// 	SuppliesService.addSupplies(selected_supplies)
			// };

			// $scope.addType = function(selected_types) {
			// 	TypesService.addTypes(selected_types)
			// };

			// $location.path('/results');

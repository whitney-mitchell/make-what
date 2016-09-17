'use strict';

angular.module('make-what')
	.controller('MainCtrl', ['$scope','$http', '$location', '$timeout', '$routeParams', 'apiUrl', 'RootFactory',

		function($scope, $http, $location, $timeout, $routeParams, apiUrl, RootFactory){
			$scope.projects = null;
			$scope.types = null;
			$scope.users = null;

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
					// Then store types and get users
					res => {
						$scope.types = res.data;
						return $http.get($scope.root.users);
					}, console.error
				);(
					// Then store users
					res => $scope.users = res.data, console.error
				);

      $scope.search = () => {



      }


		}
	]);

'use strict';

angular.module('make-what')
	.controller('MakerCtrl', ['$scope','$http', '$location', 'apiUrl', 'RootFactory',

		function($scope, $http, $location, apiUrl, RootFactory){
			$scope.heading = 'maker page. see saved projects here.';

			$scope.makersprojects = null;
			$scope.projects = null;

			$scope.root = null;

			console.log("thisUser", RootFactory.credentials.user)

			RootFactory.getApiRoot()
				.then(
					// Store root, get makersprojects
					root => {
						$scope.root = root;
						return $http.get(`${root.makersprojects}`)
					}, console.error
				).then(
					// Store makersprojects, get projects
					res => {
						$scope.makersprojects = res.data;
						return $http.get($scope.root.projects)
					}, console.error
				).then(
					// Store projects
					res => $scope.projects = res.data, console.error
				);



			// Something like
			// $scope.makersprojectsArray = []
			// for (var i = 0; i < $scope.makersprojects.length; i++)
			// 	if (signedinuser.id == $scope.makersprojects[i].project.id)
			// 		$scope.makersprojectsArray.push($scope.makersprojects[i].project.id)

			// Or
			// for (var i= 0; i < $scope.makersprojects.length; i++)
			// 	if (signedinuser.id == $scope.projects[i].makersprojects.user.id)
			// 		return $scope.projects[i.name]

		}
	]);

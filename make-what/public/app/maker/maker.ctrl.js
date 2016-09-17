'use strict';

angular.module('make-what')
	.controller('MakerCtrl', ['$scope','$http', '$location', 'apiUrl', 'RootFactory',

		function($scope, $http, $location, apiUrl, RootFactory){
			$scope.heading = 'maker page. see saved projects here.';


		}
	]);

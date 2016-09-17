'use strict';

angular.module('make-what')
	.config(($routeProvider) => {
		$routeProvider
		// on main page, view all featured projects, and search by supplies (at least)
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: '/app/main/main.html'
			})

	})

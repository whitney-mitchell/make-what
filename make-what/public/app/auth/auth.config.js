'use strict';

angular.module('make-what')
	.config($routeProvider => {
		$routeProvider
			.when('/register/', {
				controller: 'AuthCtrl',
				templateUrl: '/app/auth/register.html'
			})
			.when('/login/', {
				controller: 'AuthCtrl',
				templateUrl: '/app/auth/login.html'
			})
	})


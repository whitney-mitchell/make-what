'use strict';

angular.module('make-what')
	.config(($routeProvider) => {
		$routeProvider
			.when('/register', {
				controller: 'RegisterCtrl',
				controllerAs: 'reg',
				templateUrl: '/app/register/register.html'
			})

	})


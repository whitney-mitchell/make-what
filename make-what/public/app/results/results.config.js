'use strict';

angular.module('make-what')
	.config(($routeProvider) => {
		$routeProvider
			.when('/results', {
				controller: 'ResultsCtrl',
				templateUrl: '/app/results/results.html'
			})
	})

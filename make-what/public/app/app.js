'use strict'

angular.module('make-what', ['ngRoute', 'ui.bootstrap'])

	.config(function($interpolateProvider, $httpProvider, $routeProvider) {
		// Use interpolation punctuation that differs from Django's
		$interpolateProvider.startSymbol('((');
		$interpolateProvider.endSymbol('))');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	})


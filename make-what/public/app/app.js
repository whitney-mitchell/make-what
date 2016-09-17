'use strict'

angular.module('make-what', ['ngRoute', 'ui.bootstrap'])
	.constant('apiUrl', "http://localhost:8000")

	.config(function($interpolateProvider, $httpProvider, $routeProvider) {
		// Use interpolation punctuation that differs from Django's
		$interpolateProvider.startSymbol('((');
		$interpolateProvider.endSymbol('))');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	})


'use strict'

angular.module('make-what', ['ngRoute', 'ui.bootstrap'])
	// Establish root apiUrl
	.constant('apiUrl', "http://localhost:8000")

	.config(function($interpolateProvider, $httpProvider, $routeProvider) {
		// Use interpolation punctuation that differs from Django's
		$interpolateProvider.startSymbol('((');
		$interpolateProvider.endSymbol('))');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	})

	// Directive to allow autofocus on html fields specified.
	// Otherwise, Angular partials don't like the autofocus attr.
	.directive('autofocus', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			link : function($scope, $element) {
				$timeout(function() {
					$element[0].focus();
				});
			}
		}
	}])

	// Directive to create an event listener for the Enter key.
	// Now pressing enter calls the method specified in the html.
	.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
	})


	// Filter to capitalize
	.filter('capitalize', () => {
    return (api_results_string) => {
      return api_results_string.charAt(0).toUpperCase() + api_results_string.slice(1)
    }
  })


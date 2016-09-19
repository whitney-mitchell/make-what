'use strict';

angular.module('make-what')
	.controller('AuthCtrl', ['$scope','$http', '$location', 'apiUrl', 'RootFactory', 'UserFactory',

		function($scope, $http, $location, apiUrl, RootFactory, UserFactory){
			$scope.logheading = "I'm login!";
			$scope.regheading = "I'm the registration station!";

			$scope.user = {
				username: '',
				password:''
			};
			$scope.root = null;

			$scope.register = function() {
				$http({
					url: `${apiUrl}/register/`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						'username': $scope.user.username,
						'password': $scope.user.password,
						'email': $scope.user.email,
						'first_name': $scope.user.first_name,
						'last_name': $scope.user.last_name
					}
				}).success(res => {
					if (res.success) {
						console.log('data', res);
						$location.path('/');
					}
				}).error(() => {
					window.alert('Try a different username.');
					});
			};

			$scope.login = function() {
				$http({
					url: `${apiUrl}/login`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						'username': $scope.user.username,
						'password': $scope.user.password
					}
				}).success(res => {
					if (res.success) {
						// If login is successful, store data for use in API
						// requests that require permissions.
						RootFactory.credentials({
							username: $scope.user.username,
							password: $scope.user.password
						});
						const userObj = JSON.parse(res.user)[0].fields;
						UserFactory.setUser(userObj)
						// Redirect to main view on success
						$location.path('/');
					}
				}).error(() => {
					// window.alert('Please register as a maker before logging in.');
					// $location.path('/register/');
					});
			};

		}
]);


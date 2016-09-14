'use strict';

angular.module('make-what')
	.controller('RegisterCtrl', function($scope){
		const reg = this;

		reg.register = function() {
			$http({
				url: '/register/',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					'username': reg.user.userName,
					'password': reg.user.password,
					'email': reg.user.email,
					'first_name': reg.user.firstName,
					'last_name': reg.user.lastName
				}
			}).success(res => {
				if (res.data === 'True') {
					$location.path('/')
				} else {
					err => window.alert("Sorry, your registration didn't take. Try again.");
				}
			}).error(() => {
				err => window.alert("Sorry, your registration didn't take. Try again.");
			});
		};



	})

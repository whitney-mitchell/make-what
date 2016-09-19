'use strict';

// Promise used to decorate the routes that require login in order to render
// Here, must login to view user's saved projects.
let requiresAuth = ($location, RootFactory) => new Promise((resolve, reject) => {
	if (RootFactory.credentials()) {
		console.log('User is authenticated, resolve route promise');
		resolve();
	} else {
		window.alert('Please log in to view your saved projects.');
		console.log('User is not authenticated, reject route promise');
		reject();
		$location.path('/login');
	}
});

angular.module('make-what')
	.config(($routeProvider) => {
		$routeProvider
			.when('/maker', {
				controller: 'MakerCtrl',
				templateUrl: '/app/maker/maker.html',
				resolve: { requiresAuth }
			})
			.when('/add_new', {
				controller: 'MakerCtrl',
				templateUrl: '/app/maker/makeNewProject.html',
				resolve: { requiresAuth }
			})
	})

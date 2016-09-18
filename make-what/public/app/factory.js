'use strict';

angular.module('make-what')
	.factory('RootFactory', ['$http', '$timeout', 'apiUrl',

		($http, $timeout, apiUrl) => {
			let apiRoot = null;
			let httpGet = $http.get(apiUrl);
			let userCredentials = {};
// .constant('apiUrl', "http://localhost:8000")
			return {
				getApiRoot () {
					return httpGet.then(res => res.data)
				},
				// Store (set) or get credentials.
				credentials (creds) {
					if (creds) {
						userCredentials = creds;
					} else {
						if (userCredentials.hasOwnProperty("password")) {
							// take username:password, convert to base 64
							return window.btoa(`${userCredentials.username}:${userCredentials.password}`);
						} else {
							return false;
						}
					}
				}
			}
		}
	]);

'use strict';
/**
* AuthTokenInterceptor Module
*
* Description
*/
angular.module('dashboard.AuthTokenInterceptor', [])
.factory('AuthTokenInterceptor', ['$rootScope', '$q', '$window', function($rootScope,$q, $window){ 
    return {
      request: function(config) {
        // I want to capture the Token that comes either from the headers or from the * data response
        config.headers = config.headers || {};

        if ($window.sessionStorage.token) {
          console.log('Interceptor:' + $window.sessionStorage.token);
          config.headers.Authorization = 'Token-Bearer ' + $window.sessionStorage.token;
        }
        return config
      },
      response: function(response){
        if( response.status == 401 ) {
          // Do something if the response fails
        }
        return response || $q.when(response);
      }
    }

  }])
  .config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('AuthTokenInterceptor')
  }]);
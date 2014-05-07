'use strict';

/**
* token.authentication Module
*
* Description
*/
angular.module('token.authentication', []).
factory('AuthenticationInterceptor', ['$window', '$q', function($window, $q){

  return {
    request: function(config) { 
      config.headers = config.headers || {};

      if ($window.sessionStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer' + $window.sessionStorage.getItem('token');
      }
      return config || $q.when(config)
    },
    response: function(response) {
      if( response.status == 401) {

      }
      return response || $q.when(response);
    }
  };

}])
.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('AuthenticationInterceptor');
}]);


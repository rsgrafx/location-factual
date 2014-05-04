'use strict'

/**
*  Module
*
* This will handle the authentication layer.
*/
angular.module('locationFinder.authentication', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
      
      function success(response) {
        return response;
      }

      function error(response) {
        if (response.status == 401) {
          $rootScope.$broadcast('event:unauthorized');
          $location.path('/users/login');
          return response;
        }

        return $q.reject(response);
      }
      $httpProvider.responseInterceptors.push(interceptor);
    }];
  }]);

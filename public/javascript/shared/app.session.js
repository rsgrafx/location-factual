'use strict'

/**
* SessionService Module
*
* Description
*/
angular.module('SessionService', [])

.factory('Session', ['$location', '$window', '$http', '$q', function( $location, $window, $http, $q) {
  
  function redirect(url) {
    url = url || '/dashboard';
    $location.path(url);
  }

  var service = {
    login: function(email, password) {
      return $http.post('http://localhost:3000/users/sign_in.json', { user: { email: email, password: password } })
        .success( function( response, status, headers, config ) {
          // console.log(response);
          // At this point I should capture the - Token.          
          if (response.user.authentication_token) {
              $window.sessionStorage.token = response.user.authentication_token
              console.log('This is the SessionStorage :' + $window.sessionStorage.token);
          }
        
        // Rails does not return a nested user: object
            service.currentUser = response;            
          if (service.isAuthenticated()) {
              $location.path('/welcome')
          };

      }).error(function (data, status, headers, config) {
      // Erase the token if the user fails to log in
      delete $window.sessionStorage.token;

      // Handle login errors here
      $scope.message = 'Error: Invalid user or password';

      })
    },
    
    logout:  function(redirectTo) {
      delete $window.sessionStorage.token;
      service.currentUser = null;
      redirect('/login');
    },

    register: function(email, password, confirm_password) {
      return $http.post('http://localhost:3000/users.json', { user: {email: email, password: password, confirm_password: confirm_password}})
        .then(function(response) {
          
          service.currentUser = response.data.user;
          console.log(response.data.user)
          
          if (response.data.user.authentication_token) {
              $window.sessionStorage.token = response.data.user.authentication_token
              console.log('This is the SessionStorage :' + $window.sessionStorage.token);
          }
          if (service.isAuthenticated()) {
            $location.path('/welcome');
          }
        })
    },

    requestCurrentUser: function() {
      if(service.isAuthenticated()) {
        return $q.when(service.currentUser)
      } else {
        return $http.get('/users').then(function(response) {
          service.currentUser = response.data.user;
          return service.currentUser;
        })
      }
    },
    currentUser: null,

    isAuthenticated: function() {
      return !!$window.sessionStorage.token;
    }
    // close service
  };
  return service;
}])
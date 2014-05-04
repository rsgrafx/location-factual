'use strict'

/**
* SessionService Module
*
* Description
*/
angular.module('SessionService', [])

.factory('Session', ['$location', '$http', '$q', function($location, $http, $q) {
  
  function redirect(url) {
    url = url || '/dashboard';
    $location.path(url);
  }

  var service = {
    login: function(email, password) {
      return $http.post('http://localhost:3000/users/sign_in', { user: { email: email, password: password } })
      .then( function(response) { 
        service.currentUser = response.data.user; 
        if (service.isAuthenticated()) {
            $location.path('/dashboard')
        };
      });
    },
    
    logout:  function(redirectTo) {
     $http.delete('http://localhost:3000/users/sign_out')
     .then(function(response) {
      $http.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
      service.currentUser = null;
      redirect(redirecTo);
     })
    },

    register: function(email, password, confirm_password) {
      return $http.post('http://localhost:3000/users', { user: {email: email, password: password, confirm_password: confirm_password}})
        .then(function(response) {
          service.currentUser = response.data;
          if (service.isAuthenticated()) {
            $location.path('/dashboard');
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
      return !!service.currentUser;
    }

    // close service
  };
  return service;
}])
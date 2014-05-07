'use strict'

/**
* LocationFinderDashboard Module
*
* Description
*/

var LocationFinderDashboard = angular.module('LocationFinderDashboard', [ 
  'ngRoute',
  'locationFinder.directives',
  'SessionService',
  'dashboard.controllers'
  ,'dashboard.AuthTokenInterceptor'
  ])
.controller('NavCtrl', ['$scope', 'Session', function($scope, Session){
  $scope.logged_in = function() {
    return !!Session.isAuthenticated();
  }
  $scope.logOutUser = function() {
    return Session.logout();
  }
  
}])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/profile', {templateUrl: 'views/dashboard/profile.html'})
      .when('/welcome', { templateUrl: 'views/dashboard/welcome.html'})
      .when('/login',   { templateUrl: 'views/dashboard/login.html', controller: 'UsersCtrl' })
      .when('/register',{templateUrl:  'views/dashboard/register.html'})
      .otherwise({templateUrl:'views/dashboard/welcome.html'})
}])
.run(['$rootScope', '$location', 'Session', function($rootScope, $location, Session) {

  $rootScope.$on('$routeChangeStart', function(event) {
    // if not logged in.
    if (!Session.isAuthenticated()) {
      console.log('watch out thief');
      event.preventDefault();
      $location.path('/login')
    }
  })
}])

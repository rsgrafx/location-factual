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
  ])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/login',   { templateUrl: 'views/dashboard/login.html', controller: 'UsersCtrl' })
      .when('/register',{templateUrl: 'views/dashboard/register.html'})
      .otherwise({templateUrl:'views/dashboard/main.html'})
  }])

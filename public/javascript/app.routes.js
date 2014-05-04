'use strict'

/**
* locationFinder.routes Module
*
* Description
*/
angular.module('locationFinder.routes', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/main',          {templateUrl: 'views/main.html'})
      .when('/users/login',   {templateUrl: 'views/users/login.html'})
      .when('/users/register',{templateUrl: 'views/users/register.html'})
      .otherwise({templateUrl:'views/main.html'})
  }])

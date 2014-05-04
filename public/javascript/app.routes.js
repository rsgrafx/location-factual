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
      .when('/dashboard',     {templateUrl:'/dashboard/index.html'})
      .when('/users/login',   {templateUrl:'/users/login.html'})
      .when('/users/register', {templateUrl:'/users/register.html'})
      .otherwise({templateUrl:'views/main.html'})
  }])

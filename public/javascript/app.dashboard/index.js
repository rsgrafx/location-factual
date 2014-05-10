'use strict'

/**
* LocationFinderDashboard Module
*
* Description
*/

var lfinder = angular.module('LocationFinderDashboard', [ 
  'SessionService',
  'dashboard.controllers',
  'dashboard.AuthTokenInterceptor',
  'dashboard.routing',
  'dashboard.guides'
  ])
.controller('NavCtrl', ['$scope', 'Session', function($scope, Session){
    $scope.logged_in = function() {
    return !!Session.isAuthenticated();
  }
  
  $scope.logOutUser = function() {
    return Session.logout();
  }  
}])
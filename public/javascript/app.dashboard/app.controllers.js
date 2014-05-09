'use strict'

/**
* dashboard.controllers Module
*
* Description
*/

angular.module('dashboard.controllers', [])
  .controller('UsersCtrl', ['$scope', '$state', '$location', 'Session', 
  function UsersCtrl($scope, $state, $location, Session ) {
  
  $scope.login = function(user) {
    $scope.authError = null;

    Session.login(user.email, user.password)
      .then(function(response) {
        if(!response) { 
          $scope.authError = 'Credentials are not valid ';
        } else {
          $scope.authError = 'Success!'
        }
      },
      function(response) {
          $scope.authError = 'Server offline, please try later'
      })
  };

  $scope.logout = function(user) {
    
  };

  $scope.logged_in = function() {
    return !!Session.isAuthenticated();
  };

  $scope.register = function(user) {
    $scope.authError = null;

    Session.register(user.email, user.password, user.confirmation_password)
      .then( function(response) {
          $scope.authError = 'Successfully Registered'
          console.log(response);
      
          }, function(response) {
            var errors = '';
            $.each( response.data.errors, function(index, value) {
            errors += index.substr(0,1).toUpperCase()+index.substr(1)+ ' '+ value +'';
        });
        
        $scope.authError = errors;
      
      });
    };

  // testing state params..

  $scope.$on('$stateChangeSuccess', function (event, toState) {
      console.log(toState)
      if (!Session.isAuthenticated()) {
        $location.path('/login');
      }
  });

}]).controller('HomeCtrl', ['$scope', '$window', '$http', function HomeCtrl($scope, $window, $http){
  $scope.position = null;
  $scope.address = null;

  $scope.getLocation = function() {
    
    window.navigator.geolocation.getCurrentPosition( 
      
      function(position) {
          $scope.$apply(function() { 
            $scope.position = position;
            
            var _coords = { latitude: position.coords.latitude, 
                            longitude: position.coords.longitude }
            console.log(_coords)

            $http({ url: '/locations', 
                    data: JSON.stringify(_coords), 
                    method: 'POST',
                    headers: 'Content-Type: application/json'
              
            }).success(function(data) {
              $scope.locations  = data;
            })
          }); 
        }, 
        function(error) {
          alert(error)
      });
  };
}])
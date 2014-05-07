// The Angular Appplication.
var locationFinder = angular.module('placesNearMe', [ 
  'ngRoute',
  'locationFinder.authentication',
  'locationFinder.routes',
  'locationFinder.directives',
  'SessionService'
  ])

locationFinder.controller('NavCtrl', ['$scope', 'Session', function($scope, Session){

  $scope.logged_in = function() {
    return !!Session.isAuthenticated();
  }

}])

locationFinder.controller('PlacesCtrl', ['$scope', '$window', '$http', 'Session', function($scope, $window, $http, Session){
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



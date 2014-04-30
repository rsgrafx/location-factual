// The Angular Appplication.
var locationFinder = angular.module('placesNearMe', [])

locationFinder.controller('PlacesCtrl', ['$scope', '$window', function($scope, $window){
  $scope.position = null;

  $scope.getLocation = function() {
    
    window.navigator.geolocation.getCurrentPosition( 
      function(position) {
          $scope.$apply(function() { 
            $scope.position = position; 
          }); 
        }, 
        function(error) {
          alert(error)
      });
  };

}])






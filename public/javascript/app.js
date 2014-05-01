// The Angular Appplication.
var locationFinder = angular.module('placesNearMe', [])

locationFinder.controller('PlacesCtrl', ['$scope', '$window', '$http', function($scope, $window, $http){
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


  $scope.checkCity = function() {
    if ($scope.another.city) {
      console.log( $scope.another.city);
      $http({ url: '/locations', 
              data: JSON.stringify( {check_city: $scope.another.city}), 
              method: 'POST', 
              headers: 'Content-Type: application/json'
            }).success(function(data) {
              $scope.locations = data;
              console.log(data)
          })
    }
  }
}])


locationFinder.controller('MorePlacesCtrl', ['$scope', function($scope) {

  $scope.checkCity = function() {
    console.log('This is Nice');
  }
}])
'use strict';

/* Directives */


angular.module('locationFinder.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('googleplace', ['currentCity', '$location', '$http', function(currentCity, $location, $http) {
    return {
        link: function(scope, element, attrs) {
                    var options = {
                        types: ['(cities)'],
                        componentRestrictions: {}
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        var place = scope.gPlace.getPlace();
                            console.log(place);
                        var current_city = {
                          name: place.name,
                          formatted_address: place.formatted_address,
                          location: {
                            lat: place.geometry.location.lb,
                            lng: place.geometry.location.mb
                          }
                        }
                        currentCity.setProperty(current_city);

                        console.log(current_city)


                        $http({ url: '/locations', 
                          data: JSON.stringify( {check_city: current_city.name } ), 
                          method: 'POST', 
                          headers: 'Content-Type: application/json'
                        }).success(function(data) {
                          scope.locations = data;
                          scope.locations.city = current_city.name
                        })

                    });
                }

    }
}])
.service('currentCity', function () {
        var current_city = {
            name: "",
            formatted_address: "",
            location: {
                lat: "",
                lng: ""
            }
        }

        return {
            getProperty: function () {
                return current_city;
            },
            setProperty: function(value) {
                current_city = value;
            }
        };
    });


require 'rubygems'
require 'geocoder'

require_relative 'venue'

class Location

  R = 3_959

  attr_accessor :longitude, :latitude, :current_location
  
  def initialize(longitude: longitude, latitude: latitude)
    @longitude = longitude
    @latitude  = latitude
  end

  def nearest_city
    result = Geocoder.search( "#{self.latitude}, #{self.longitude}" )
    self.current_location = result.first.city
  end

  def wifi_nearby
    Venue.new(self.current_location).restaurants_with_wifi
  end

  def near?(latitude: latitude, longitude: longitude, radius: radius)
    raise ArgumentError unless radius >= 0
    location = Location.new(latitude: latitude, longitude: longitude)      
    (R * haversine_distance(location)) <= radius
  end

  private

  def to_radians(degrees)
    degrees * Math::PI / 180
  end

  def haversine_distance(location)
    dist_lat  = to_radians(location.latitude - self.latitude)
    dist_long = to_radians(location.longitude - self.longitude)

    lat1      = to_radians(self.latitude)
    lat2      = to_radians(location.latitude)

    # Formula for checking ??
    _a =   Math.sin(dist_lat/2) * Math.sin(dist_lat/2) + 
           Math.sin(dist_long) * Math.sin(dist_long/2) *
           Math.cos(lat1) * Math.cos(lat2)
    
    _b =  2 * Math.atan2(Math.sqrt(_a), Math.sqrt(1-_a))
  end

end
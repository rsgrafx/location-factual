$LOAD_PATH.unshift( (File.expand_path(File.dirname(__FILE__)) + '/lib'))

require 'rubygems'
require 'bundler/setup'

Bundler.require(:default)

require 'location'
require 'geocoder'
require 'sinatra/base'
require 'sinatra/json'

class LocationFinder < Sinatra::Base

  set :static, true
  set :public_folder, File.expand_path(File.dirname(__FILE__)) + '/public'
  set :sessions, true

  before do 
    if request.request_method == "POST"
      body_parameters = request.body.read
      params.merge!(JSON.parse(body_parameters))
    end
  end

  get '/' do 
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/locations' do
    content_type :json
  end

  post '/locations' do
    content_type :json

    if params['check_city']
      loc = Venue.new(params['check_city'])
      { city: @city, wifi: loc.restaurants_with_wifi , locations_count: loc.restaurants_with_wifi.count   }.to_json
    else
      loc = Location.new(latitude: params['latitude'], longitude: params['longitude'])
      @city ||= loc.nearest_city
      { city: @city, wifi: loc.wifi_nearby, locations_count: loc.wifi_nearby.count }.to_json
    end

    
  end

end

$LOAD_PATH.unshift( (File.expand_path(File.dirname(__FILE__)) + '/lib'))

require 'rubygems'
require 'bundler/setup'

Bundler.require(:default)

require 'location'
require 'sinatra/base'
require 'sinatra/json'

class LocationFinder < Sinatra::Base

  set :static, true
  set :public_folder, File.expand_path(File.dirname(__FILE__)) + '/public'
  set :sessions, true

  get '/' do 
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/locations' do
    json ["Hello User"]
  end

  get '/location/:item' do
    json params.sort
  end

  post '/location' do
    json params.sort
  end

end

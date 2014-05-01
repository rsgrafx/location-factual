require 'factual'

FactualKey = ENV['FACTUAL_KEY']
FactualSecret = ENV['FACTUAL_SECRET']

class Venue
  attr_reader :factual, :location

  def initialize(location)
    @location = location
    @factual = Factual.new(FactualKey, FactualSecret)
  end

  def restaurants_with_wifi
    factual.table("hotels-v3").filters({"locality" => self.location}).rows
  end

end
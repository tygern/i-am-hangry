require "sinatra"
require "oauth"
require "yaml"
require "haml"
require "json"

require_relative "lib/location_service"

class Hangry < Sinatra::Base
  get "/" do
    location = "Boulder"
    erb :index, locals: {location: location}
  end

  get "/restaurants" do
    content_type :json

    consumer = OAuth::Consumer.new(ENV["FACTUAL_KEY"], ENV["FACTUAL_SECRET"])
    token = OAuth::AccessToken.new(consumer)

    latitude = params["latitude"]
    longitude = params["longitude"]

    if latitude.nil? || latitude.empty? || longitude.nil? || longitude.empty?
      location = LocationService.find_location(request.ip)
      latitude = location["latitude"]
      longitude = location["longitude"]
    end

    geo_data = {
      "$circle" => {
        "$center" => [latitude, longitude],
        "$meters" => 5000
      }
    }

    url = CGI.escape(geo_data.to_json)

    response = token.get(
      "http://api.v3.factual.com/t/restaurants-us?geo=#{url}&limit=50"
    )

    restaurants = JSON.parse(response.body)["response"]["data"].inject([]) do |list, place|
      tags = place["cuisine"] || []
      list << {name: place["name"], tags: tags}
    end

    restaurants.to_json
  end
end
require "sinatra"
require "oauth"
require "yaml"
require "haml"
require "json"

class Hangry < Sinatra::Base
  get "/" do
    authentication = YAML.load_file(File.expand_path("config/access.yml", __dir__))
    consumer = OAuth::Consumer.new authentication["key"],
                                 authentication["secret"],
                                 {site: authentication["site"]}
    token = OAuth::AccessToken.new(consumer)
    location = "Boulder"

    response = token.get("http://api.v3.factual.com/t/restaurants-us?q=#{location}")

    restaurants = JSON.parse(response.body)["response"]["data"].inject([]) do |list, place|
      list << {name: place["name"], tags: place["cuisine"]}
    end

    erb :index, locals: {location: location, restaurants: restaurants.to_json}
  end
end
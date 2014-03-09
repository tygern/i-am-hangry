require "sinatra"
require "oauth"
require "yaml"
require "haml"
require "json"

class Hangry < Sinatra::Base
  get "/" do
    location = "Boulder"
    erb :index, locals: {location: location}
  end

  get "/restaurants" do
    content_type :json

    authentication = YAML.load_file(File.expand_path("config/access.yml", __dir__))
    consumer = OAuth::Consumer.new authentication["key"],
                                   authentication["secret"],
                                   {site: authentication["site"]}
    token = OAuth::AccessToken.new(consumer)

    response = token.get("http://api.v3.factual.com/t/restaurants-us?q=Boulder&limit=50")

    restaurants = JSON.parse(response.body)["response"]["data"].inject([]) do |list, place|
      tags = place["cuisine"] || []
      list << {name: place["name"], tags: tags}
    end

    restaurants.to_json
  end
end
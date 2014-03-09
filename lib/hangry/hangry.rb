require "sinatra"
require "oauth"
require "yaml"
require "json"

class Hangry < Sinatra::Base
  get "/" do
    content_type :json

    authentication = YAML.load_file(File.expand_path("../../config/access.yml", __dir__))
    consumer = OAuth::Consumer.new authentication["key"],
                                 authentication["secret"],
                                 {site: authentication["site"]}
    token = OAuth::AccessToken.new(consumer)

    response = token.get("http://api.v3.factual.com/t/restaurants-us?q=Boulder")

    restaurants = JSON.parse(response.body)["response"]["data"].inject([]) do |list, place|
      list << {name: place["name"], tags: place["cuisine"]}
    end

    restaurants.to_json
  end
end
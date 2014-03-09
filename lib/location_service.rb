require "httparty"

class LocationService
  def self.find_location(ip_address)
    response = HTTParty.get("http://freegeoip.net/json/76.120.65.67")
    JSON.parse(response.body)
  end
end
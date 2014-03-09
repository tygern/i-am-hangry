require "sinatra"

class Hangry < Sinatra::Base
  get "/" do
    "hello"
  end
end
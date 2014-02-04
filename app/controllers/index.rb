get '/' do
  erb :index
end

post '/new_game' do
  if params[:player_1] == params[:player_2]
    redirect '/'
  end
  player_1 = Player.where(name: params[:player_1]).first_or_create
  player_2 = Player.where(name: params[:player_2]).first_or_create
  game = Game.create()
  game << player_1
  game << player_2


  redirect '/play'
end

get '/play' do

end

post '/end_game' do

end

get '/results/:id' do
end

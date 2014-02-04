get '/' do
  erb :index
end

post '/new_game' do
  if params[:player_1] == params[:player_2]
    @error_message = true
    erb :index
  else
    player_1 = Player.where(name: params[:player_1]).first_or_create
    player_2 = Player.where(name: params[:player_2]).first_or_create
    game = Game.create()
    game.players << player_1
    game.players << player_2
    session[:game_id] = game.id
    session[:player_1] = player_1.name
    session[:player_2] = player_2.name
    @player_2 = session[:player_2]
    redirect '/play'
  end
end

get '/replay' do
  player_1 = Player.where(name: session[:player_1]).first_or_create
  player_2 = Player.where(name: session[:player_2]).first_or_create
  game = Game.create()
  game.players << player_1
  game.players << player_2
  session[:game_id] = game.id
  redirect '/play'
end

get '/play' do
  erb :play
end

post '/end_game' do
  puts "Our params are:"
  p params
  p params["player"]
  p params["duration"]

  winner = session[:player_1] if params["player"] == "1"
  winner = session[:player_2] if params["player"] == "2"

  player = Player.find_by(name: winner).game_players.find_by(game_id: session[:game_id])
  player.winner = true
  player.save
  g = Game.find(session[:game_id])
  g.duration = params["duration"]
  g.save
  p winner
  p "/games/#{session[:game_id]}"
  "/games/#{session[:game_id]}"
end

get '/games/:id' do
  @game = Game.find(params[:id])
  # Do a false check here, in case a game is incomplete and there is no winner.
  @player = @game.game_players.find_by(winner: true).player
  erb :results
end

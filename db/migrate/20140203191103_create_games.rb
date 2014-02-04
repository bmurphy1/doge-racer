class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :winner
      t.string :duration
      t.string :url
    end
  end
end

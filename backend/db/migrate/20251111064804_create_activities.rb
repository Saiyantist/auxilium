class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.references :user, foreign_key: true
      t.references :ticket, foreign_key: true
      t.string :action, null: false
      t.json :metadata
      t.datetime :created_at
    end
    add_index :activities, :action
  end
end

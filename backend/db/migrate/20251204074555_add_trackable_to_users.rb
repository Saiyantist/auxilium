class AddTrackableToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users do |t|
      ## Trackable
      t.datetime :current_sign_in_at
      # t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip
      t.integer  :sign_in_count, default: 0, null: false
    end
  end
end

class AddStatusAndLastLoginDateToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :status, :integer
    add_column :users, :last_login_at, :datetime
  end
end

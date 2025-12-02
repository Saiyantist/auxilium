class AddPersonalDetailFieldsToUser < ActiveRecord::Migration[7.1]
  def change
    # Add columns as nullable first
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string

    # Backfill existing users with default values
    reversible do |dir|
      dir.up do
        # Backfill first_name and last_name for existing users
        execute "UPDATE users SET first_name = 'User' WHERE first_name IS NULL"
        execute "UPDATE users SET last_name = 'Name' WHERE last_name IS NULL"
        
        # Backfill status for existing users (1 = inactive per enum)
        execute "UPDATE users SET status = 1 WHERE status IS NULL"
      end
    end

    # Now enforce NOT NULL constraints
    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    
    # Set default for status and enforce NOT NULL
    change_column_default :users, :status, from: nil, to: 1
    change_column_null :users, :status, false

    rename_column :users, :last_login_at, :last_sign_in_at
  end
end

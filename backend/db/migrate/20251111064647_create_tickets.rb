class CreateTickets < ActiveRecord::Migration[7.1]
  def change
    create_table :tickets do |t|
      t.string :number, null: true, index: { unique: true } # will be filled after creation
      t.string :subject, null: false
      t.text :description
      t.integer :status, null: false, default: 0
      t.integer :priority, null: false, default: 1
      t.integer :severity, null: false, default: 0
      t.integer :ticket_type, null: false, default: 0
      t.references :category, foreign_key: true
      t.references :project, foreign_key: true
      t.bigint :creator_id, null: false
      t.bigint :assignee_id
      t.datetime :due_date
      t.datetime :closed_at

      t.timestamps
    end

    add_foreign_key :tickets, :users, column: :creator_id
    add_foreign_key :tickets, :users, column: :assignee_id
    add_index :tickets, :creator_id
    add_index :tickets, :assignee_id
    add_index :tickets, :status
  end
end

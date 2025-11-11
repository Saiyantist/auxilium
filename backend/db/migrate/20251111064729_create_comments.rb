class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.references :ticket, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      # t.references :parent, null: false, foreign_key: true
      t.bigint :parent_id
      t.text :content, null: false
      t.boolean :internal, default: false

      t.timestamps
    end
    add_foreign_key :comments, :comments, column: :parent_id
    add_index :comments, :parent_id
  end
end

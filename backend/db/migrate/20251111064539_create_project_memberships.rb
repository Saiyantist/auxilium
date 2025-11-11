class CreateProjectMemberships < ActiveRecord::Migration[7.1]
  def change
    create_table :project_memberships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
      t.integer :role, null: false, default: 0

      t.timestamps
    end
  end
end

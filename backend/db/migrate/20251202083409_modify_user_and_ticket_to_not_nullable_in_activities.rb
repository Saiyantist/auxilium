class ModifyUserAndTicketToNotNullableInActivities < ActiveRecord::Migration[7.1]
  def change
    change_column_null :activities, :user_id, false
    change_column_null :activities, :ticket_id, false
  end
end

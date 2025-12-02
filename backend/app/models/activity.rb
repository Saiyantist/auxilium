class Activity < ApplicationRecord
  belongs_to :user
  belongs_to :ticket

  validates :action, presence: true

  # Standardized action naming
  ACTIONS = %w[
    ticket_created
    ticket_updated
    ticket_status_changed
    comment_created
    comment_updated
    comment_deleted
  ]
end

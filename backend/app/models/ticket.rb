class Ticket < ApplicationRecord
  belongs_to :category
  belongs_to :project
  belongs_to :creator
  belongs_to :assignee
end

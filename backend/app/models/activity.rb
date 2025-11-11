class Activity < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :ticket, optional: true

  validates :action, presence: true
end

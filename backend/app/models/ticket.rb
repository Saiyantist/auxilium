class Ticket < ApplicationRecord
  enum status: { open: 0, pending: 1, on_hold: 2, resolved: 3, closed: 4}
  enum priority: { low: 0, medium: 1, high: 2, urgent: 3 }
  enum severity: { minor: 0, major: 1, critical: 2 }
  enum ticket_type: { issue: 0, question: 1, task: 2 }

  belongs_to :category, optional: true
  belongs_to :project, optional: true
  belongs_to :creator, class_name: "User", foreign_key: :creator_id
  belongs_to :assignee, class_name: "User", foreign_key: :assignee_id, optional: true

  has_many :comments, dependent: :destroy
  has_many :activities, dependent: :destroy
  has_many :notifications, as: :notifiable, dependent: :destroy

  # Attachments via ActiveStorage
  has_many_attached :files

  # Validations
  validates :subject, presence: true
  validates :status, presence: true
  validates :priority, presence: true

  # Ticket numbering assigned after creation
  after_create :assign_ticket_number

  private

  def assign_ticket_number
    # "T-00001" or "PROJECTKEY-00001"
    seq = format('%04d', self.id)
    num = project&.key.present? ? "#{project.key}-#{seq}" : "T-#{seq}"
    update_column(:number, num)
  end
end

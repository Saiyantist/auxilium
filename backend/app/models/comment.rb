class Comment < ApplicationRecord
  belongs_to :ticket
  belongs_to :user
  belongs_to :parent, class_name: "Comment", optional: true
  has_many :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy

  has_many_attached :files

  validates :content, presence: true
end

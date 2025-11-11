class Category < ApplicationRecord
  has_many :tickets, dependent: :nullify

  validates :name, presence: true, uniqueness: true
end

class Project < ApplicationRecord
  has_many :tickets, dependent: :nullify
  has_many :project_memberships, dependent: :destroy
  has_many :users, through: :project_memberships

  validates :name, presence: true
  validates :key, presence: true, uniqueness: true
end

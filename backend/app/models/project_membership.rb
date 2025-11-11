class ProjectMembership < ApplicationRecord
  enum role: { project_admin: 0, agent: 1, viewer: 2 }

  belongs_to :user
  belongs_to :project

  validates :user_id, uniqueness: { scope: :project_id}
end

class Api::V1::UsersController < ApplicationController
  before_action :ensure_agent_or_admin

  # GET /api/v1/users/clients — active users with client role (for "Create for Client" dropdown)
  def clients
    users = User.active.client.order(:first_name, :last_name)
    render json: users.as_json(only: %i[id first_name last_name email])
  end

  private

  def ensure_agent_or_admin
    return if current_user&.admin? || current_user&.agent?

    render json: { error: "Forbidden" }, status: :forbidden
  end
end
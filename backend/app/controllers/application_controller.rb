class ApplicationController < ActionController::API
  include Pundit::Authorization

  # Ensure Devise current_user is available
  # before_action :authenticate_user!

  # Rescue from unauthorized access
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden
  end
end

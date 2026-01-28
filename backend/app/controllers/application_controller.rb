class ApplicationController < ActionController::API
  include Pundit::Authorization

  # Require auth by default, but allow Devise controllers to be public.
  before_action :authenticate_user!, unless: :devise_controller?

  # Rescue from unauthorized access
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden
  end
end

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Pundit::Authorization

  before_action :set_authorization_from_jwt_cookie

  # Require auth by default, but allow Devise controllers to be public.
  before_action :authenticate_user!, unless: :devise_controller?

  # Rescue from unauthorized access
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  # Allow devise-jwt to authenticate using an HttpOnly cookie.
  # Copied the JWT into the Authorization header expected by warden-jwt_auth.
  def set_authorization_from_jwt_cookie
    return if request.headers["Authorization"].present?

    token = cookies[:access_token]
    request.headers["Authorization"] = "Bearer #{token}" if token.present?
  end

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden
  end
end

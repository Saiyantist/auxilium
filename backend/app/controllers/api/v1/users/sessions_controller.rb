class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    token = request.env["warden-jwt_auth.token"]

    cookies[:access_token] = {
      value: token,
      httponly: true,
      secure: Rails.env.production?,
      same_site: Rails.env.production? ? :none : :lax
    }

    render json: { success: true }, status: :ok
  end

  def respond_to_on_destroy
    cookies.delete(:access_token)
    head :no_content
  end
end
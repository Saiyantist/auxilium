# frozen_string_literal: true
class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # POST /api/v1/users/registrations — sign up a user
  #
  # Builds a user resource based on the sign_up_params
  # and saves it to the database. If the user is successfully
  # created, set the access token cookie with the user's JWT
  # token and render the user's information in JSON.
  # If the user is not successfully created, render the validation
  # errors in JSON with a status of 422 Unprocessable Entity.
  def create
    build_resource(sign_up_params)

    if resource.save
      token = Warden::JWTAuth::UserEncoder.new.call(resource, :user, nil)[0]

      cookies[:access_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: Rails.env.production? ? :none : :lax
      }

      render json: {
        id: resource.id,
        first_name: resource.first_name,
        last_name: resource.last_name,
        email: resource.email,
        role: resource.role
      }, status: :created
    else
      clean_up_passwords resource
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Whitelist parameters for sign up action.
  # This method is called in the create action to build the user resource.
  def sign_up_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :first_name,
      :last_name
    )
  end
end
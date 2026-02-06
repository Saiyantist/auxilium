class Api::V1::MeController < ApplicationController
  # Show the currently authenticated user's details.
  # GET /api/v1/me
  # Returns a JSON object containing the user's details.
  def show
    render json: {
      id: current_user.id,
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      email: current_user.email,
      role: current_user.role
    }, status: :ok
  end
end


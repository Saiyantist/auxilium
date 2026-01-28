# frozen_string_literal: true

module Api
  module V1
    class MeController < ApplicationController
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
  end
end


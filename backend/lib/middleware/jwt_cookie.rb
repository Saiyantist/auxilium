# frozen_string_literal: true

module Middleware
  # Copies the JWT from an HttpOnly cookie into the Authorization header
  # so devise-jwt/warden-jwt_auth can authenticate as usual.
  class JwtCookie
    COOKIE_NAME = "access_token"

    def initialize(app)
      @app = app
    end

    def call(env)
      req = Rack::Request.new(env)

      unless env["HTTP_AUTHORIZATION"] && !env["HTTP_AUTHORIZATION"].empty?
        token = req.cookies[COOKIE_NAME]
        env["HTTP_AUTHORIZATION"] = "Bearer #{token}" if token && !token.empty?
      end

      @app.call(env)
    end
  end
end


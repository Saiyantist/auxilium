class User < ApplicationRecord
  enum role: { admin: 0, agent: 1, client: 2 }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  # Disable session storage for API requests
  Devise.skip_session_storage = [:http_auth, :params_auth]
end

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

  # Email validations
  # Note: Devise's :validatable already handles email presence and uniqueness
  # We only add a stricter format validation
  validates :email, format: { 
    with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i,
    message: "must be a valid email address"
  }, if: :email_changed?

  # Password validations (applies to registration and password changes)
  # Note: Devise's :validatable handles password presence, but we override length
  validates :password, length: { minimum: 8, maximum: 128 }, 
            if: -> { password.present? }
  validate :password_complexity, if: -> { password.present? }

  # Role validation
  validates :role, presence: true, inclusion: { in: roles.keys }

  private

  # Password complexity validation
  def password_complexity
    return if password.blank?

    errors.add(:password, "must contain at least one uppercase letter") unless password.match?(/[A-Z]/)
    errors.add(:password, "must contain at least one lowercase letter") unless password.match?(/[a-z]/)
    errors.add(:password, "must contain at least one number") unless password.match?(/\d/)
  end
end

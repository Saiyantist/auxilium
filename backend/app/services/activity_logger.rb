class ActivityLogger
  def self.log(user:, ticket:, action:, metadata: {})
    Activity.create!(
      user: user,
      ticket: ticket,
      action: action,
      metadata: metadata
    )
  rescue => e
    Rails.logger.error("ActivityLogger Error: #{e.message}")
  end
end
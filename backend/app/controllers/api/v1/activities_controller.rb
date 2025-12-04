class Api::V1::ActivitiesController < ApplicationController
  before_action :set_ticket

  # READ only => audit trails shouldn't be writable.
  def index
    activities = policy_scope(@ticket.activities)

    render json: activities.map { |a| activity_json(a) }, status: :ok
  end

  private

  def set_ticket
    @ticket = Ticket.find(params[:ticket_id])
  end

  def activity_json(a)
    {
      id: a.id,
      action: a.action,
      metadata: a.metadata,
      user: { id: a.user.id, first_name: a.user.first_name, last_name: a.user.last_name, email: a.user.email },
      created_at: a.created_at
    }
  end
end
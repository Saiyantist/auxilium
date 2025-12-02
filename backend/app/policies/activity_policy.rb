class ActivityPolicy < ApplicationPolicy
  # NOTE: Up to Pundit v2.3.1, the inheritance was declared as
  # `Scope < Scope` rather than `Scope < ApplicationPolicy::Scope`.
  # In most cases the behavior will be identical, but if updating existing
  # code, beware of possible changes to the ancestors:
  # https://gist.github.com/Burgestrand/4b4bc22f31c8a95c425fc0e30d7ef1f5

  def index?
    return false unless user

    return true if user.admin?
    return true if user.agent? && ticket_visible_to_agent?
    return true if user.client? && record.ticket.creator_id == user.id

    false
  end

  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end

    def resolve
      return scope.all.includes(:user) if user.admin?

      if user.agent?
        # agent sees logs for tickets they can access
        scope.joins(:ticket)
             .where("tickets.assignee_id = ? OR tickets.assignee_id IS NULL", user.id)
             .includes(:user)
      elsif user.client?
        # client sees logs only for their tickets
        scope.joins(:ticket)
             .where(tickets: { creator_id: user.id })
             .includes(:user)
      else
        scope.none
      end
    end
  end

  private

  def ticket_visible_to_agent?
    record.ticket.assignee_id == user.id || record.ticket.assignee_id.nil?
  end
end

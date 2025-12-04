class CommentPolicy < ApplicationPolicy
  # NOTE: Up to Pundit v2.3.1, the inheritance was declared as
  # `Scope < Scope` rather than `Scope < ApplicationPolicy::Scope`.
  # In most cases the behavior will be identical, but if updating existing
  # code, beware of possible changes to the ancestors:
  # https://gist.github.com/Burgestrand/4b4bc22f31c8a95c425fc0e30d7ef1f5

    # Rules:
    # - admin: full access
    # - agent: can view/create/update/destroy comments on tickets they can view (assigned or open to agents)
    # - client: can create/view comments only for tickets they own; cannot see internal comments


    def index?
      user.present?
    end

    def show?
      return false unless user

      return true if user.admin?
      return true if user.agent? && ticket_visible_to_agent?

      # clients cannot view internal comments
      return true if user.client? && record.ticket.creator_id == user.id && !record.internal?

      false
    end


    # User can do everything if admin
    def create?
      return true if user.admin?
  
      # Agents can create comments on tickets they are assigned to
      return true if user.agent? && ticket_visible_to_agent?
  
      # Clients can create comments only on their own tickets
      return true if user.client? && record.ticket.creator_id == user.id && !record.internal?
  
      false
    end
  
    def update?
      return false unless user

      # uncomment this if admins could edit all comments
      # return true if user.admin?

      # authors can edit their comments
      return true if record.user_id == user.id
      return true if user.agent? && ticket_visible_to_agent? && record.user_id == user.id
      false
    end
  
    def destroy?
      return false unless user
      return true if user.admin?
      return true if record.user_id == user.id
      false
    end

  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
    def resolve
      return scope.none unless user.present?

      return scope.all if user&.admin?

      if user&.agent?
        return scope.joins(:ticket)
                    .where(tickets: { assignee_id: [user.id, nil] })

      elsif user&.client?
        return scope.joins(:ticket)
                    .where(tickets: { creator_id: user.id })
                    .where(internal: false)
      else
        scope.none
      end
    end
  end

  def ticket_visible_to_agent?
    # agent can view ticket if they are assignee or tickets unassigned (business rule)
    record.ticket.assignee_id == user.id || record.ticket.assignee_id.nil?
  end
end

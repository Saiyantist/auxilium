class TicketPolicy < ApplicationPolicy
  # NOTE: Up to Pundit v2.3.1, the inheritance was declared as
  # `Scope < Scope` rather than `Scope < ApplicationPolicy::Scope`.
  # In most cases the behavior will be identical, but if updating existing
  # code, beware of possible changes to the ancestors:
  # https://gist.github.com/Burgestrand/4b4bc22f31c8a95c425fc0e30d7ef1f5

  def index?
    # true # Allow anyone to view all tickets
    user.present?
  end

  def show?
    return false unless user

    return true if user.admin?  # Admins see all
    return true if user.agent? && (record.assignee_id == user.id || record.assignee_id.nil?)  # Agent sees their assigned tickets and tickets that are not assigned to any agent
    return true if user.client? && record.creator_id == user.id  # Client sees own tickets
    return true if record.assignee_id == user.id

    false
  end

  # Clients and Agents can create tickets
  def create? 
    user.present?
  end

  def update?
    return false unless user
    return true if user.admin? # Admins can update any ticket
    return true if user.agent? && record.assignee_id == user.id # Agents can update assigned tickets
    return true if user.client? && record.creator_id == user.id && record.open? # Clients can edit before resolved
    false
  end

  def destroy?
    user.present? && user.admin?
  end

  # Assign ticket to an agent — only admin or agent can assign (admin generally)
  def assign?
    user.present? && (user.admin? || user.agent?)
  end

  # Closing ticket 
  def close?
    return true if user.admin? # All
    return true if user.agent? && record.assignee_id == user.id # Assigned tickets
    return true if user.client? && record.creator_id == user.id && record.resolved? # Request to close own resolved tickets
    false
  end

  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
    
    def resolve
      return scope.none unless user.present? # Extra guard to show none if unauthorized access. 

      return scope.all if user.admin?

      # Agents see all tickets assigned to them and unassigned tickets
      return scope.where("assignee_id = ? OR assignee_id IS NULL", user.id) if user&.agent?
      # return scope.where(assignee_id: user.id) if user&.agent?
      
      # Clients see own tickets
      return scope.where(creator_id: user.id) if user&.client?
      
      scope.none
    end
  end
end

class Api::V1::TicketsController < ApplicationController
    before_action :set_ticket, only: %i[show update destroy]

    def index
      @tickets = policy_scope(Ticket)
      render json: @tickets.as_json(tickets_includes)
    end
    
    def show
      authorize @ticket
      render json: @ticket.as_json(tickets_includes)
    end

    def create
      @ticket = Ticket.new(ticket_params_for_create)
      set_creator_and_assignee!

      authorize @ticket

      if @ticket.errors.empty? && @ticket.save
        ActivityLogger.log(
          user: current_user,
          ticket: @ticket,
          action: "ticket_created",
          metadata: { subject: @ticket.subject }
        )
        render json: @ticket.as_json(tickets_includes), status: :created
      else
        render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      authorize @ticket

      if @ticket.update(ticket_params)
        render json: @ticket
      else
        render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @ticket
      @ticket.destroy
      head :no_content
    end

    private

    def set_ticket
      @ticket = Ticket.find(params[:id])
    end
  
    def ticket_params
      params.require(:ticket).permit(
        :subject, :description, :status, :priority, :ticket_type, :severity,
        :due_date, :creator_id, :assignee_id, :project_id, :category_id
      )
    end

    # For create: creator and assignee are set in set_creator_and_assignee!, not from params
    def ticket_params_for_create
      ticket_params.except(:assignee_id, :creator_id)
    end

    def set_creator_and_assignee!

      # Normal Creation Logic
      if current_user.client?
        @ticket.creator = current_user
        @ticket.assignee_id = nil

      # Agent's/Admin's Ticket Creation Logic
      elsif current_user.admin? || current_user.agent?
        creator_id = ticket_params[:creator_id].presence
        if creator_id.blank?
          @ticket.errors.add(:base, "Create for Client is required")
          return
        end
        creator = User.find_by(id: creator_id)
        unless creator&.client? && creator&.active?
          @ticket.errors.add(:creator_id, "must be an active client")
          return
        end
        @ticket.creator = creator
        @ticket.assignee = current_user
      end
    end

    def tickets_includes
      {
        include: {
          assignee: { only: %i[id first_name last_name email] },
          creator:  { only: %i[id first_name last_name email] }
        }
      }
    end
end

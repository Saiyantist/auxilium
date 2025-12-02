class Api::V1::TicketsController < ApplicationController
    before_action :set_ticket, only: %i[show update destroy]

    def index
      @tickets = policy_scope(Ticket)
      render json: @tickets
    end
    
    def show
      authorize @ticket
      render json: @ticket
    end

    def create
      @ticket = Ticket.new(ticket_params)
      @ticket.creator = current_user
  
      authorize @ticket
  
      if @ticket.save
        ActivityLogger.log(
          user: current_user,
          ticket: @ticket,
          action: "ticket_created",
          metadata: { subject: @ticket.subject }
        )
        render json: @ticket, status: :created
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
      params.require(:ticket).permit(:subject, :description, :status, :priority, :assignee_id, :project_id, :category_id)
    end
end

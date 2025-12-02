class Api::V1::CommentsController < ApplicationController
  before_action :set_ticket
  before_action :set_comment, only: %i[show update destroy]

  # GET /api/v1/tickets/:ticket_id/comments
  def index
    @comments = policy_scope(@ticket.comments)
    render json: @comments.map { |c| comment_json(c) }
  end

  # GET /api/v1/tickets/:ticket_id/comments/:id
  def show
    authorize @comment
    render json: comment_json(@comment)
  end

  # POST /api/v1/tickets/:ticket_id/comments
  def create
    @comment = @ticket.comments.build(comment_params)
    @comment.user = current_user

    authorize @comment

    if @comment.save
      # Log activity (basic)
      ActivityLogger.log(
        user: current_user,
        ticket: @ticket,
        action: "comment_created",
        metadata: { comment_id: @comment.id }
      )
      render json: comment_json(@comment), status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/tickets/:ticket_id/comments/:id
  def update
    authorize @comment
    if @comment.update(comment_params)
      ActivityLogger.log(
        user: current_user,
        ticket: @ticket,
        action: "comment_updated",
        metadata: { comment_id: @comment.id }
      )
      render json: comment_json(@comment)
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/tickets/:ticket_id/comments/:id
  def destroy
    authorize @comment
    @comment.destroy
    ActivityLogger.log(
      user: current_user,
      ticket: @ticket,
      action: "comment_deleted",
      metadata: { comment_id: @comment.id }
    )
    head :no_content
  end

  private

  def set_ticket
    @ticket = Ticket.find(params[:ticket_id])
  end

  def set_comment
    @comment = @ticket.comments.find(params[:id])
  end

  def comment_params
    # Only allow internal flag if current_user is agent or admin; otherwise force false
    permitted = [:content, :parent_id]
    if current_user&.agent? || current_user&.admin?
      permitted << :internal
    end
    params.require(:comment).permit(permitted)
  end

  def comment_json(comment)
    # Safely expose fields based on policy
    {
      id: comment.id,
      ticket_id: comment.ticket_id,
      # user: { id: comment.user.id, email: comment.user.email},
      user: { id: comment.user.id, first_name: comment.user.first_name, last_name: comment.user.last_name, email: comment.user.email },
      content: comment.content,
      internal: comment.internal, 
      parent_id: comment.parent_id,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    }
  end

end
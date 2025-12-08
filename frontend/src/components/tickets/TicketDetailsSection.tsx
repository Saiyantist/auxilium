"use client"

import { useState } from "react"
import type { Comment, Ticket } from "@/types"
import { useAddComment, useDeleteComment, useUpdateComment } from "@/hooks/useComments"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useAuth } from "@/hooks/use-auth"

export default function TicketDetailsSection({
  ticket,
  comments,
}: {
  ticket: Ticket
  comments: any
}) {
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const addComment = useAddComment(ticket.id)
  const deleteComment = useDeleteComment(ticket.id)
  const editComment = useUpdateComment(ticket.id) // Replace with useEditComment if available
  const { user } = useAuth();

  const handleSubmit = () => {
    if (!content.trim()) return
    addComment.mutate({ content })
    setContent("")
  }

  const firstName = ticket.assignee?.first_name ?? ""
  const lastName = ticket.assignee?.last_name ?? ""
  const fullName = `${firstName} ${lastName}`.trim() ?? "Unassigned"

  return (
    <div className="space-y-6">
      {/* Description Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg text-purple-800 font-semibold mb-3">Description</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{ticket.description}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Assignee</h3>
          <p className="text-base font-medium">{fullName}</p>
        </div>

        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Due Date</h3>
          <p className="text-base font-medium">
            {ticket.due_date ? new Date(ticket.due_date).toLocaleString() : "No due date"}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg text-purple-800 font-semibold mb-4">Comments</h2>

        {/* Add comment box */}
        <div className="space-y-3 mb-6">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-24"
          />
          <Button onClick={handleSubmit} disabled={!content.trim()}>
            Post Comment
          </Button>
        </div>

        {/* Comment list */}
        <div className="space-y-4">
          {comments.isLoading && <p className="text-gray-500">Loading comments...</p>}

          {comments.data?.length === 0 && !comments.isLoading && (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          )}

          {comments.data?.map((c: Comment) => {
            const isOwnComment = c.user?.id === user?.id;
            return (
              <div
                key={c.id}
                className={`border rounded-lg p-4 hover:bg-gray-100 transition-colors ${isOwnComment ? "bg-purple-100 hover:bg-purple-200" : "bg-gray-50"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className={`font-medium text-sm ${isOwnComment ? "text-purple-800" : ""}`}>
                      {c.user?.first_name} {c.user?.last_name}
                    </div>
                    <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
                  </div>
                  {isOwnComment && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <MoreHorizontal size={18} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => {
                              setEditingId(c.id)
                              setEditContent(c.content)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-red-600"
                            onClick={() => deleteComment.mutate(c.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                {editingId === c.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          if (!editContent.trim()) return
                          editComment.mutate({ commentId: c.id, payload: { content: editContent } });
                          setEditingId(null)
                        }}
                        disabled={!editContent.trim()}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed">{c.content}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

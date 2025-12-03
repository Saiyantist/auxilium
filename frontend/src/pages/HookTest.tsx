"use client"

import { useState } from "react"
import { useTickets, useTicket, useTicketActivities } from "@/hooks/useTickets"
import { useTicketComments, useAddComment, useDeleteComment } from "@/hooks/useComments"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash2, Plus } from "lucide-react"

export default function HooksTestPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // load all tickets
  const tickets = useTickets()

  // when a ticket is selected
  const ticket = useTicket(selectedId ?? 0)
  const comments = useTicketComments(selectedId ?? 0)
  const activities = useTicketActivities(selectedId ?? 0)

  const addComment = useAddComment(selectedId ?? 0)
  const deleteComment = useDeleteComment(selectedId ?? 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-foreground">Hook Playground</h1>
          <p className="text-muted-foreground mt-2">Test and explore your API hooks in real-time</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Select a Ticket</CardTitle>
            <CardDescription>Choose a ticket to view its details, comments, and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              {tickets.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Loading tickets...</span>
                </div>
              ) : (
                <div className="flex-1 max-w-xs">
                  <Select value={selectedId?.toString() ?? ""} onValueChange={(value) => setSelectedId(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a ticket..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tickets.data?.map((t) => (
                        <SelectItem key={t.id} value={t.id.toString()}>
                          #{t.id} — {t.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {selectedId && <Badge variant="secondary">ID: {selectedId}</Badge>}
            </div>
          </CardContent>
        </Card>

        {selectedId && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ticket Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
                <CardDescription>Full ticket information</CardDescription>
              </CardHeader>
              <CardContent>
                {ticket.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading ticket...</span>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-4 overflow-auto max-h-96">
                    <pre className="text-xs font-mono text-foreground whitespace-pre-wrap break-words">
                      {JSON.stringify(ticket.data, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activities Sidebar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activities</CardTitle>
                <CardDescription>Recent changes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Loading...</span>
                  </div>
                ) : activities.data && activities.data.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-auto">
                    {activities.data.map((activity: any, idx: number) => (
                      <div key={idx} className="text-xs border-l-2 border-primary/30 pl-3 py-1">
                        <p className="font-mono text-foreground/80 truncate">
                          {typeof activity === "string" ? activity : JSON.stringify(activity)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No activities yet</p>
                )}
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Comments</CardTitle>
                    <CardDescription>Discussion and feedback</CardDescription>
                  </div>
                  <Badge variant="outline">
                    {comments.data?.length ?? 0} comment{comments.data?.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading comments...</span>
                  </div>
                ) : (
                  <>
                    {/* Comments List */}
                    <div className="space-y-2 max-h-48 overflow-auto">
                      {comments.data && comments.data.length > 0 ? (
                        comments.data.map((c) => (
                          <div
                            key={c.id}
                            className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground break-words">{c.content}</p>
                              <p className="text-sm text-muted-foreground break-words">Commented by: {c.user?.first_name} {c.user?.last_name}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteComment.mutate(c.id)}
                              disabled={deleteComment.isPending}
                              className="h-8 w-8 p-0 flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No comments yet</p>
                      )}
                    </div>

                    {/* Add Comment Button */}
                    <Button
                      onClick={() => addComment.mutate({ content: "Test comment from UI" })}
                      disabled={addComment.isPending}
                      className="w-full gap-2"
                    >
                      {addComment.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Add Test Comment
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedId && (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <div className="rounded-lg bg-muted/50 p-8 max-w-md">
              <h3 className="text-lg font-semibold text-foreground mb-2">No ticket selected</h3>
              <p className="text-sm text-muted-foreground">
                Select a ticket from the dropdown above to view its details, comments, and activity history.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

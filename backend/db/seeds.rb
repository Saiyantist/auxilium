# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
# Comment.destroy_all
# Ticket.destroy_all
# User.destroy_all

puts "Creating users..."

# OG Users
User.create!(email: 'admin@example.com', first_name: "Admin", last_name: "Poaco", password: 'P@ssword1', role: :admin)
User.create!(email: 'agent@example.com', first_name: "Agent", last_name: "Poaco", password: 'P@ssword1', role: :agent)
User.create!(email: 'client@example.com', first_name: "Client", last_name: "Poaco", password: 'P@ssword1', role: :client)

# Create agents (5 agents)
agents = [
  { email: "sarah.chen@company.com", first_name: "Sarah", last_name: "Chen", role: :agent },
  { email: "michael.rodriguez@company.com", first_name: "Michael", last_name: "Rodriguez", role: :agent },
  { email: "emma.wilson@company.com", first_name: "Emma", last_name: "Wilson", role: :agent },
  { email: "david.kim@company.com", first_name: "David", last_name: "Kim", role: :agent },
  { email: "lisa.patel@company.com", first_name: "Lisa", last_name: "Patel", role: :agent }
]

agent_records = agents.map do |agent_data|
  User.create!(
    email: agent_data[:email],
    password: "P@ssword1",
    first_name: agent_data[:first_name],
    last_name: agent_data[:last_name],
    role: agent_data[:role],
    status: :active,
    last_sign_in_at: rand(1..30).days.ago
  )
end

# Create clients (15 clients)
clients = [
  { email: "john.smith@clientco.com", first_name: "John", last_name: "Smith" },
  { email: "jane.doe@acmecorp.com", first_name: "Jane", last_name: "Doe" },
  { email: "robert.johnson@techstart.com", first_name: "Robert", last_name: "Johnson" },
  { email: "maria.garcia@innovate.io", first_name: "Maria", last_name: "Garcia" },
  { email: "james.brown@business.com", first_name: "James", last_name: "Brown" },
  { email: "patricia.miller@enterprise.net", first_name: "Patricia", last_name: "Miller" },
  { email: "thomas.davis@startup.io", first_name: "Thomas", last_name: "Davis" },
  { email: "jennifer.martinez@solutions.com", first_name: "Jennifer", last_name: "Martinez" },
  { email: "william.anderson@digital.co", first_name: "William", last_name: "Anderson" },
  { email: "elizabeth.taylor@corp.com", first_name: "Elizabeth", last_name: "Taylor" },
  { email: "charles.thomas@ventures.io", first_name: "Charles", last_name: "Thomas" },
  { email: "susan.jackson@global.com", first_name: "Susan", last_name: "Jackson" },
  { email: "daniel.white@partner.co", first_name: "Daniel", last_name: "White" },
  { email: "nancy.harris@customer.com", first_name: "Nancy", last_name: "Harris" },
  { email: "kevin.martin@buyer.net", first_name: "Kevin", last_name: "Martin" }
]

client_records = clients.map do |client_data|
  User.create!(
    email: client_data[:email],
    password: "P@ssword1",
    first_name: client_data[:first_name],
    last_name: client_data[:last_name],
    role: :client,
    status: :active,
    last_sign_in_at: rand(1..60).days.ago
  )
end

puts "Created #{agent_records.count} agents and #{client_records.count} clients"

# Ticket templates with realistic scenarios
ticket_templates = [
  # Critical/Urgent issues
  { subject: "Production Database Connection Failing", description: "Our production database keeps timing out. Users are unable to access the application. This started about 30 minutes ago.", priority: :urgent, severity: :critical, ticket_type: :issue, status: :open },
  { subject: "Payment Gateway Down - Transactions Failing", description: "All payment transactions are failing with error code 500. Customers are reporting they cannot complete purchases.", priority: :urgent, severity: :critical, ticket_type: :issue, status: :pending },
  { subject: "Security Alert - Unauthorized Access Detected", description: "Our monitoring system detected multiple unauthorized login attempts from an unknown IP address. Need immediate investigation.", priority: :urgent, severity: :major, ticket_type: :issue, status: :resolved },
  
  # High priority issues
  { subject: "Email Notifications Not Sending", description: "Users are not receiving password reset emails. The email queue appears to be stuck.", priority: :high, severity: :major, ticket_type: :issue, status: :on_hold },
  { subject: "Dashboard Loading Very Slowly", description: "The main dashboard is taking 30+ seconds to load. This is affecting all users in our organization.", priority: :high, severity: :major, ticket_type: :issue, status: :resolved },
  { subject: "Mobile App Crashes on Login", description: "The iOS app crashes immediately after entering credentials. Android version works fine.", priority: :high, severity: :major, ticket_type: :issue, status: :closed },
  { subject: "API Rate Limiting Too Restrictive", description: "We're hitting rate limits during normal operations. Need the limit increased or our usage pattern reviewed.", priority: :high, severity: :minor, ticket_type: :issue, status: :resolved },
  
  # Medium priority issues
  { subject: "Report Export Function Not Working", description: "When I try to export reports to Excel, I get a 'file format not supported' error.", priority: :medium, severity: :minor, ticket_type: :issue, status: :closed },
  { subject: "User Profile Image Not Uploading", description: "Cannot upload profile pictures. The upload button doesn't respond when clicked.", priority: :medium, severity: :minor, ticket_type: :issue, status: :resolved },
  { subject: "Search Results Show Deleted Items", description: "The search function is returning items that were deleted weeks ago.", priority: :medium, severity: :minor, ticket_type: :issue, status: :open },
  { subject: "Broken Links in Documentation", description: "Several links in the user guide section lead to 404 pages.", priority: :medium, severity: :minor, ticket_type: :issue, status: :pending },
  { subject: "Time Zone Display Incorrect", description: "All timestamps are showing in UTC instead of my local timezone, even though my profile is set correctly.", priority: :medium, severity: :minor, ticket_type: :issue, status: :resolved },
  
  # Questions
  { subject: "How to Set Up SSO Integration?", description: "We want to integrate SAML SSO with our corporate identity provider. What are the steps and requirements?", priority: :medium, severity: :minor, ticket_type: :question, status: :closed },
  { subject: "API Authentication Best Practices", description: "What's the recommended approach for API authentication? Should we use OAuth2 or API keys?", priority: :low, severity: :minor, ticket_type: :question, status: :resolved },
  { subject: "Bulk User Import Process", description: "We need to import 500 users. Is there a CSV import feature or do we need to use the API?", priority: :medium, severity: :minor, ticket_type: :question, status: :closed },
  { subject: "Data Retention Policy Clarification", description: "How long is deleted data retained in your backups? We need this for compliance purposes.", priority: :medium, severity: :minor, ticket_type: :question, status: :resolved },
  { subject: "Webhook Configuration Help", description: "I'm trying to set up webhooks for new user registrations but getting authentication errors.", priority: :medium, severity: :minor, ticket_type: :question, status: :open },
  
  # Tasks
  { subject: "Request Access to Analytics Module", description: "Please grant our team access to the advanced analytics dashboard. We have the enterprise plan.", priority: :medium, severity: :minor, ticket_type: :task, status: :closed },
  { subject: "Change Account Owner", description: "We need to transfer account ownership from john.old@company.com to jane.new@company.com.", priority: :medium, severity: :minor, ticket_type: :task, status: :resolved },
  { subject: "Increase Storage Quota", description: "Our current 100GB storage is almost full. Please upgrade us to 500GB.", priority: :low, severity: :minor, ticket_type: :task, status: :closed },
  { subject: "Custom Domain Setup", description: "We want to use app.ourcompany.com instead of the default subdomain.", priority: :low, severity: :minor, ticket_type: :task, status: :resolved },
  
  # Low priority issues
  { subject: "Minor UI Alignment Issue on Settings Page", description: "The Save button on the settings page is slightly misaligned on mobile devices.", priority: :low, severity: :minor, ticket_type: :issue, status: :open },
  { subject: "Typo in Welcome Email", description: "The automated welcome email has a typo in the second paragraph: 'recieve' should be 'receive'.", priority: :low, severity: :minor, ticket_type: :issue, status: :resolved },
  { subject: "Dark Mode Colors Hard to Read", description: "In dark mode, the gray text on dark background is difficult to read. Could use better contrast.", priority: :low, severity: :minor, ticket_type: :issue, status: :pending },
  
  # Mixed realistic scenarios
  { subject: "Unable to Delete Old Project", description: "When I try to delete a project from 2022, I get an error saying 'Project has dependencies'. How do I resolve this?", priority: :medium, severity: :minor, ticket_type: :question, status: :closed },
  { subject: "Feature Request: Calendar Integration", description: "Would be great if due dates could sync with Google Calendar or Outlook.", priority: :low, severity: :minor, ticket_type: :task, status: :open },
  { subject: "Two-Factor Authentication Not Working", description: "I enabled 2FA but I'm not receiving the verification codes via SMS.", priority: :high, severity: :major, ticket_type: :issue, status: :resolved },
  { subject: "Billing Statement Discrepancy", description: "The invoice shows 50 users but we only have 45 active accounts. Can you review?", priority: :medium, severity: :minor, ticket_type: :question, status: :closed },
  { subject: "Session Timeout Too Short", description: "I keep getting logged out every 15 minutes. Can the session timeout be extended?", priority: :low, severity: :minor, ticket_type: :question, status: :resolved },
  { subject: "Cannot Assign Tasks to External Collaborators", description: "Getting 'Permission Denied' when trying to assign tasks to users outside our organization.", priority: :medium, severity: :minor, ticket_type: :issue, status: :on_hold },
  { subject: "Automated Backup Verification", description: "Please confirm our automated backups are running successfully. Last notification was 3 weeks ago.", priority: :high, severity: :major, ticket_type: :task, status: :resolved },
  { subject: "White Screen After Update", description: "After yesterday's system update, I only see a white screen when accessing the reports section.", priority: :high, severity: :major, ticket_type: :issue, status: :closed },
  { subject: "Password Complexity Requirements", description: "What are the exact password requirements? The error message isn't clear.", priority: :low, severity: :minor, ticket_type: :question, status: :closed },
  { subject: "Slow File Upload Speed", description: "Uploading a 50MB file takes over 10 minutes. Is this normal?", priority: :medium, severity: :minor, ticket_type: :question, status: :resolved },
  { subject: "Duplicate Notification Emails", description: "I'm receiving duplicate notification emails for every action. Sometimes 3-4 copies of the same email.", priority: :medium, severity: :minor, ticket_type: :issue, status: :resolved },
  { subject: "API Documentation Outdated", description: "The API docs show endpoints that return 404. Looks like they haven't been updated since version 2.0.", priority: :medium, severity: :minor, ticket_type: :issue, status: :pending },
  { subject: "Request Training Session for New Features", description: "Our team would like a training session on the new workflow automation features released last month.", priority: :low, severity: :minor, ticket_type: :task, status: :open },
  { subject: "CSV Import Formatting Issues", description: "When I import CSV files, special characters are not displaying correctly (showing � instead).", priority: :medium, severity: :minor, ticket_type: :issue, status: :resolved },
  { subject: "Cannot Access Admin Panel", description: "Getting 'Access Denied' when trying to access the admin panel, even though I'm listed as an admin.", priority: :high, severity: :major, ticket_type: :issue, status: :closed },
  { subject: "Audit Log Not Recording Changes", description: "The audit log hasn't recorded any changes for the past week, but we've made several updates.", priority: :high, severity: :major, ticket_type: :issue, status: :resolved },
  { subject: "Form Validation Error Messages Unclear", description: "When form validation fails, the error messages don't specify which fields are incorrect.", priority: :low, severity: :minor, ticket_type: :issue, status: :open },
  { subject: "Mobile Push Notifications Delayed", description: "Push notifications on mobile arrive 30-60 minutes after the event occurs.", priority: :medium, severity: :minor, ticket_type: :issue, status: :pending },
  { subject: "Bulk Delete Feature Not Working", description: "Selected 100 items to delete but only 23 were actually deleted. No error message shown.", priority: :medium, severity: :minor, ticket_type: :issue, status: :on_hold },
  { subject: "Integration with Slack", description: "Is there a Slack integration available? Would like to receive notifications in our team channel.", priority: :low, severity: :minor, ticket_type: :question, status: :closed },
  { subject: "Performance Issues During Peak Hours", description: "Between 9-10 AM EST, the application becomes very slow. Response times improve after 10 AM.", priority: :high, severity: :major, ticket_type: :issue, status: :resolved },
  { subject: "Request Account Deletion (GDPR)", description: "As per GDPR, I request complete deletion of my account and all associated data.", priority: :high, severity: :minor, ticket_type: :task, status: :closed },
  { subject: "Chrome Extension Not Loading", description: "The Chrome extension shows 'Failed to load' error after the latest browser update to v120.", priority: :medium, severity: :minor, ticket_type: :issue, status: :resolved },
  { subject: "Incorrect Currency Conversion", description: "The system is converting USD to EUR using outdated exchange rates.", priority: :medium, severity: :major, ticket_type: :issue, status: :resolved }
]

puts "Creating tickets and comments..."

# Helper method to generate comments
def generate_comments_for_ticket(ticket, creator, assignee, agents)
  comments = []
  
  case ticket.ticket_type
  when "issue"
    case ticket.status
    when "open"
      comments << { user_id: assignee.id, content: "Thanks for reporting this. I'm looking into it now and will update you shortly.", internal: false }
      comments << { user_id: assignee.id, content: "Need to check the server logs. This might be related to the deployment from yesterday.", internal: true }
      
    when "pending"
      comments << { user_id: assignee.id, content: "I've identified the issue. Could you confirm your browser version and clear your cache?", internal: false }
      comments << { user_id: creator.id, content: "I'm using Chrome v120. I've cleared the cache but still seeing the same problem.", internal: false }
      comments << { user_id: assignee.id, content: "Escalating to dev team. Looks like a compatibility issue with the latest Chrome update.", internal: true }

    when "on_hold"
      comments << { user_id: assignee.id, content: "This requires a backend update. I've submitted a ticket to the development team.", internal: false }
      comments << { user_id: creator.id, content: "How long do you think this will take? It's affecting our daily operations.", internal: false }
      comments << { user_id: assignee.id, content: "Usually takes 1-2 weeks for dev tickets. I'll mark this as high priority.", internal: false }
      comments << { user_id: assignee.id, content: "Dev team says they need to wait for the next release cycle. ETA is 3 weeks.", internal: true }
      
    when "resolved"
      comments << { user_id: assignee.id, content: "I've found the root cause - there was a configuration issue on our end. Working on the fix now.", internal: false }
      comments << { user_id: assignee.id, content: "Applied the fix. Can you test and confirm it's working on your end?", internal: false }
      comments << { user_id: creator.id, content: "Yes! It's working perfectly now. Thank you so much for the quick fix!", internal: false }
      comments << { user_id: assignee.id, content: "Great! I'm marking this as resolved. Let me know if you encounter any other issues.", internal: false }
      
    when "closed"
      comments << { user_id: assignee.id, content: "I've reproduced the issue and implemented a fix. This will be deployed in the next update.", internal: false }
      comments << { user_id: creator.id, content: "Perfect! When is the next update scheduled?", internal: false }
      comments << { user_id: assignee.id, content: "The fix has been deployed. Please verify it's working correctly.", internal: false }
      comments << { user_id: creator.id, content: "Confirmed working! Thanks for resolving this.", internal: false }
    end
    
  when "question"
    case ticket.status
    when "open"
      comments << { user_id: assignee.id, content: "Good question! Let me check our documentation and get back to you with details.", internal: false }
      comments << { user_id: assignee.id, content: "Need to verify with the product team on the latest policy.", internal: true }
      
    when "resolved", "closed"
      comments << { user_id: assignee.id, content: "Great question! Here's what you need to know: [detailed explanation]", internal: false }
      comments << { user_id: assignee.id, content: "To do this, you'll need to: 1) Navigate to Settings, 2) Click on Integrations, 3) Follow the setup wizard.", internal: false }
      comments << { user_id: creator.id, content: "That's exactly what I needed. Very clear instructions, thank you!", internal: false }
    end
    
  when "task"
    case ticket.status
    when "open"
      comments << { user_id: assignee.id, content: "I've received your request. I'll need to verify a few details before proceeding.", internal: false }
      comments << { user_id: assignee.id, content: "Checking with billing team on account status.", internal: true }
      
    when "resolved", "closed"
      comments << { user_id: assignee.id, content: "I've processed your request. The changes should be visible in your account within 24 hours.", internal: false }
      comments << { user_id: creator.id, content: "I can see the changes now. Everything looks good!", internal: false }
      comments << { user_id: assignee.id, content: "Excellent! Is there anything else you need help with?", internal: false }
      comments << { user_id: creator.id, content: "No, that's all. Thanks for your help!", internal: false }
    end
  end
  
  # Add extra internal comments for some tickets
  if [:on_hold, :pending, :resolved].include?(ticket.status.to_sym) && rand < 0.4
    other_agent = (agents - [assignee]).sample
    comments << { user_id: other_agent.id, content: "I've seen similar issues before. Have you checked the error logs from the load balancer?", internal: true }
    comments << { user_id: assignee.id, content: "Good point! I'll check that now.", internal: true }
  end
  
  comments
end

def calculate_due_date(priority, status, created_time, closed_at)
  sla_hours = {
    urgent: 12..36,
    high: 48..96,
    medium: 96..168,
    low: 168..240
  }

  priority_key = priority.to_sym
  range = sla_hours[priority_key] || (96..168)
  range_min, range_max = range.minmax
  base_due_date = created_time + rand(range_min..range_max).hours
  base_due_date = [base_due_date, created_time + 6.hours].max

  case status
  when :open
    min_future = Time.current + rand(12..72).hours
    base_due_date = [base_due_date, min_future].max
  when :pending
    min_future = Time.current + rand(6..48).hours
    base_due_date = [base_due_date, min_future].max
  when :on_hold
    base_due_date += rand(48..96).hours
  when :resolved, :closed
    # Keep due date near resolution and avoid slipping far past closure
    if closed_at
      base_due_date = [base_due_date, closed_at - rand(6..24).hours].min
      base_due_date = [base_due_date, created_time + 6.hours].max
    end
  end

  base_due_date
end

ticket_templates.each_with_index do |template, index|
  creator = client_records.sample
  assignee = agent_records.sample
  
  # Calculate dates based on status
  created_time = case template[:status]
  when :closed
    rand(30..90).days.ago
  when :resolved
    rand(7..30).days.ago
  when :on_hold
    rand(14..45).days.ago
  when :pending
    rand(2..10).days.ago
  else
    rand(1..5).days.ago
  end
  
  closed_at = [:closed, :resolved].include?(template[:status]) ? created_time + rand(2..72).hours : nil
  due_date = calculate_due_date(template[:priority], template[:status], created_time, closed_at)

  ticket = Ticket.create!(
    number: "TKT-#{(index + 1).to_s.rjust(5, '0')}",
    subject: template[:subject],
    description: template[:description],
    status: template[:status],
    priority: template[:priority],
    severity: template[:severity],
    ticket_type: template[:ticket_type],
    creator_id: creator.id,
    assignee_id: assignee.id,
    due_date: due_date,
    created_at: created_time,
    updated_at: created_time,
    closed_at: closed_at
  )

  # Create activities for ticket creation and assignment
  
  # Ticket created
  Activity.create!(
    user_id: creator.id,
    ticket_id: ticket.id,
    action: "ticket_created",
    metadata: {
      subject: ticket.subject,
      priority: ticket.priority,
      severity: ticket.severity
    },
    created_at: ticket.created_at
  )
  
  # Ticket assigned
  Activity.create!(
    user_id: assignee.id,
    ticket_id: ticket.id,
    action: "ticket_assigned",
    metadata: {
      assignee_name: "#{assignee.first_name} #{assignee.last_name}",
      assignee_email: assignee.email
    },
    created_at: ticket.created_at + 5.minutes
  )
  
  # Create realistic comment threads based on ticket type and status
  comments_data = generate_comments_for_ticket(ticket, creator, assignee, agent_records)
  
  comments_data.each_with_index do |comment_data, comment_index|
    comment_time = ticket.created_at + comment_index.hours + rand(1..30).minutes
    
    comment = Comment.create!(
      ticket_id: ticket.id,
      user_id: comment_data[:user_id],
      content: comment_data[:content],
      internal: comment_data[:internal],
      created_at: comment_time,
      updated_at: comment_time
    )
    
    # Create activity for each comment
    Activity.create!(
      user_id: comment.user_id,
      ticket_id: ticket.id,
      action: "comment_added",
      metadata: {
        comment_id: comment.id,
        internal: comment.internal,
        content_preview: comment.content.truncate(100)
      },
      created_at: comment_time
    )
  end

  # Create activities for ticket lifecycle events

  # Add priority changes for some urgent tickets
  if ticket.priority == "urgent" && rand < 0.5
    Activity.create!(
      user_id: assignee.id,
      ticket_id: ticket.id,
      action: "priority_changed",
      metadata: {
        from: "high",
        to: "urgent",
        reason: "Escalated due to business impact"
      },
      created_at: ticket.created_at + 30.minutes
    )
  end

  # Status changes based on ticket status
  if ticket.status != "open"
    status_change_time = ticket.created_at + rand(1..24).hours
    
    case ticket.status
    when "pending"
      Activity.create!(
        user_id: assignee.id,
        ticket_id: ticket.id,
        action: "status_changed",
        metadata: {
          from: "open",
          to: "pending",
          reason: "Awaiting user response"
        },
        created_at: status_change_time
      )
      
    when "on_hold"
      Activity.create!(
        user_id: assignee.id,
        ticket_id: ticket.id,
        action: "status_changed",
        metadata: {
          from: "open",
          to: "on_hold",
          reason: "Waiting for development team"
        },
        created_at: status_change_time
      )
      
    when "resolved"
      Activity.create!(
        user_id: assignee.id,
        ticket_id: ticket.id,
        action: "status_changed",
        metadata: {
          from: "open",
          to: "resolved",
          resolution: "Issue fixed and deployed"
        },
        created_at: status_change_time
      )
      
    when "closed"
      # First resolved
      resolved_time = ticket.created_at + rand(12..48).hours
      Activity.create!(
        user_id: assignee.id,
        ticket_id: ticket.id,
        action: "status_changed",
        metadata: {
          from: "open",
          to: "resolved",
          resolution: "Issue resolved"
        },
        created_at: resolved_time
      )
      
      # Then closed
      Activity.create!(
        user_id: assignee.id,
        ticket_id: ticket.id,
        action: "status_changed",
        metadata: {
          from: "resolved",
          to: "closed",
          closed_by: "#{assignee.first_name} #{assignee.last_name}"
        },
        created_at: ticket.closed_at
      )
    end
  end

end

puts "Seed data created successfully!"
puts "Summary:"
puts "- Users: #{User.count} (#{User.agent.count} agents, #{User.client.count} clients)"
puts "- Tickets: #{Ticket.count}"
puts "  - Open: #{Ticket.open.count}"
puts "  - Pending: #{Ticket.pending.count}"
puts "  - On Hold: #{Ticket.on_hold.count}"
puts "  - Resolved: #{Ticket.resolved.count}"
puts "  - Closed: #{Ticket.closed.count}"
puts "- Comments: #{Comment.count} (#{Comment.where(internal: true).count} internal, #{Comment.where(internal: false).count} non-internal)"
puts "- Activities: #{Activity.count}"
puts "\nActivity breakdown:"
puts "  - Ticket created: #{Activity.where(action: 'ticket_created').count}"
puts "  - Ticket assigned: #{Activity.where(action: 'ticket_assigned').count}"
puts "  - Comment added: #{Activity.where(action: 'comment_added').count}"
puts "  - Status changed: #{Activity.where(action: 'status_changed').count}"
puts "  - Priority changed: #{Activity.where(action: 'priority_changed').count}"
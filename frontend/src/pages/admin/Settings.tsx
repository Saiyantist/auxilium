import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Assuming Shadcn/UI setup
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bolt ,
  Globe,
  Bell,
  Users,
  Save,
  Ticket,
} from "lucide-react";
import { type Priority, type Status } from "@/contexts/TicketContext"; // Import types for consistency

export default function Settings() {
  // General Settings State
  const [helpdeskName, setHelpdeskName] = useState('Auxilium Helpdesk');
  const [timeZone, setTimeZone] = useState('UTC');
  const [language, setLanguage] = useState('English');

  // Ticket Settings State (using types from context)
  const [customPriorities, setCustomPriorities] = useState<Priority[]>(['Low', 'Medium', 'High']);
  const [customStatuses, setCustomStatuses] = useState<Status[]>(['In Progress', 'On Hold', 'Closed', 'Pending Approval']);
  const [customCategories, setCustomCategories] = useState<string[]>(['Technical', 'Access', 'Feedback', 'Billing']);

  // User Management Mock Data
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Pocaco', email: 'admin@example.com', role: 'Admin' },
    { id: 2, name: 'Jose Luis Vincent', email: 'jose@example.com', role: 'Agent' },
    { id: 3, name: 'Ryan James Pancho', email: 'ryan@example.com', role: 'Agent' },
  ]);

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationThreshold, setNotificationThreshold] = useState(5); // e.g., notify after X unresolved tickets

  const handleSave = (section: string) => {
    // Simulate save (replace with API call)
    alert(`${section} settings saved!`);
    console.log({ helpdeskName, timeZone, language, customPriorities, customStatuses, customCategories, users, emailNotifications, smsNotifications, notificationThreshold, apiKey, webhookUrl, theme });
  };

  const addCustomItem = (type: 'priority' | 'status' | 'category', value: string) => {
    if (!value.trim()) return;
    if (type === 'priority') {
      setCustomPriorities(prev => [...prev, value as Priority]);
    } else if (type === 'status') {
      setCustomStatuses(prev => [...prev, value as Status]);
    } else {
      setCustomCategories(prev => [...prev, value]);
    }
  };

  const removeCustomItem = (type: 'priority' | 'status' | 'category', index: number) => {
    if (type === 'priority') {
      setCustomPriorities(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'status') {
      setCustomStatuses(prev => prev.filter((_, i) => i !== index));
    } else {
      setCustomCategories(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Bolt className="w-8 h-8 text-purple-600" />
            Settings
          </h1>
          <p className="text-gray-600">Customize your helpdesk configurations</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="helpdeskName">Helpdesk Name</Label>
                  <Input id="helpdeskName" value={helpdeskName} onChange={(e) => setHelpdeskName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => handleSave('General')} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ticket Settings */}
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Ticket Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Priorities */}
                <div className="space-y-2">
                  <Label>Custom Priorities</Label>
                  <ul className="space-y-1">
                    {customPriorities.map((p, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span>{p}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeCustomItem('priority', i)}>Remove</Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input placeholder="Add new priority" onKeyDown={(e) => e.key === 'Enter' && addCustomItem('priority', e.currentTarget.value)} />
                    <Button onClick={() => addCustomItem('priority', (document.querySelector('input[placeholder="Add new priority"]') as HTMLInputElement)?.value || '')}>Add</Button>
                  </div>
                </div>

                {/* Statuses */}
                <div className="space-y-2">
                  <Label>Custom Statuses</Label>
                  <ul className="space-y-1">
                    {customStatuses.map((s, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span>{s}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeCustomItem('status', i)}>Remove</Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input placeholder="Add new status" onKeyDown={(e) => e.key === 'Enter' && addCustomItem('status', e.currentTarget.value)} />
                    <Button onClick={() => addCustomItem('status', (document.querySelector('input[placeholder="Add new status"]') as HTMLInputElement)?.value || '')}>Add</Button>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>Custom Categories</Label>
                  <ul className="space-y-1">
                    {customCategories.map((c, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span>{c}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeCustomItem('category', i)}>Remove</Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input placeholder="Add new category" onKeyDown={(e) => e.key === 'Enter' && addCustomItem('category', e.currentTarget.value)} />
                    <Button onClick={() => addCustomItem('category', (document.querySelector('input[placeholder="Add new category"]') as HTMLInputElement)?.value || '')}>Add</Button>
                  </div>
                </div>

                <Button onClick={() => handleSave('Ticket')} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Ticket Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Role</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">
                          <Select
                            value={user.role}
                            onValueChange={(value) => setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: value } : u))}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Agent">Agent</SelectItem>
                              <SelectItem value="User">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2">
                          <Button variant="outline" size="sm" onClick={() => alert(`Editing user ${user.name}`)}>Edit</Button>
                          <Button variant="destructive" size="sm" className="ml-2" onClick={() => setUsers(prev => prev.filter(u => u.id !== user.id))}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button onClick={() => handleSave('Users')} className="mt-4 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save User Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
                  <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications">Enable SMS Notifications</Label>
                  <Switch id="smsNotifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notificationThreshold">Notification Threshold (unresolved tickets)</Label>
                  <Input id="notificationThreshold" type="number" value={notificationThreshold} onChange={(e) => setNotificationThreshold(Number(e.target.value))} min={1} />
                </div>
                <Button onClick={() => handleSave('Notifications')} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
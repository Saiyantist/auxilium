// router.tsx (Updated)
import { Routes, Route } from 'react-router-dom';

/** Layouts */
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

/** Routing functions */
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

/** Pages */
import Home from '@/pages/Home';
import About from '@/pages/About';

// Authentication Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

// User Dashboard Pages
import Dashboard from '@/pages/user/Dashboard';
import Contact from '@/pages/Contact';
import MyTicket from '@/pages/user/MyTicket';
import NewTicket from '@/pages/user/NewTicket';

//Admin Dashboard Pages
import Approval from '@/pages/admin/Approval';
import Performance from '@/pages/admin/Performance';
import Settings from '@/pages/admin/Settings';
import UserManagement from '@/pages/admin/UserManagement';
import UserHistory from '@/pages/admin/UserHistory';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminDashboardLayout from '@/layouts/AdminDashboardLayout';

// Test Pages
import HooksTestPage from '@/pages/HookTest';

export default function router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Client Dashboard - Only accessible to clients */}
      <Route element={<ProtectedRoute allowedRoles={['client']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* add more routes dito */}
        </Route>
      </Route>

      {/* Agent Dashboard - Only accessible to agents */}
      <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/agent-dashboard" element={<Dashboard />} />
          {/* add more routes dito */}
        </Route>
      </Route>

      {/* Shared routes for clients and agents */}
      <Route element={<ProtectedRoute allowedRoles={['client', 'agent']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/my-ticket" element={<MyTicket />} />
          <Route path="/new-ticket" element={<NewTicket />} />
          {/* add more routes dito */}
        </Route>
      </Route>

      {/* Shared routes for all - FOR FE INTEGRATION TESTING PURPOSES */}
      <Route element={<ProtectedRoute allowedRoles={['client', 'agent', 'admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/hooks-testing" element={<HooksTestPage />} />
        </Route>
      </Route>

      {/* Admin Routes - Only accessible to admin(s) */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/user-history" element={<UserHistory />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
          {/* add more routes dito */}
        </Route>
      </Route>
    </Routes>
  );
}

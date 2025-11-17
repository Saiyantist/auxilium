// router.tsx (Updated)
import { Routes, Route } from "react-router-dom";
import { TicketProvider } from "@/contexts/TicketContext";

/** Layouts */
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

/** Routing functions */
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

/** Pages */
import Home from "@/pages/Home";
import About from "@/pages/About";

// Authentication Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// User Dashboard Pages
import Dashboard from "@/pages/user/Dashboard";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import MyTicket from "@/pages/user/MyTicket";
import NewTicket from "@/pages/user/NewTicket";


//Admin Dashboard Pages
import Approval from "@/pages/admin/Approval";
import Performance from "@/pages/admin/Performance";
import Settings from "@/pages/admin/Settings";
import Users from "@/pages/admin/Users";
import UserHistory from "@/pages/admin/UserHistory";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";

export default function router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Protected Routes - Wrapped with TicketProvider */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-ticket" element={<MyTicket />} />
          <Route path="/new-ticket" element={<NewTicket />} />
        </Route>
      </Route>

      {/* Admin Routes - will add /admin/ to path */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user-history" element={<UserHistory />} />
          <Route path="/users" element={<Users />} />
        </Route>  
      </Route>
    </Routes>
  );
}

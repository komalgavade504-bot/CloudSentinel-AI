import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import CloudResources from "../pages/CloudResources";
import ResourceDetails from "../pages/ResourceDetails";
import SecurityScanner from "../pages/SecurityScanner";
import ThreatFeed from "../pages/ThreatFeed";
import Compliance from "../pages/Compliance";
import Reports from "../pages/Reports";
import AICopilot from "../pages/AICopilot";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/cloud-resources"
          element={<CloudResources />}
        />

        <Route
          path="/cloud-resources/:id"
          element={<ResourceDetails />}
        />

        <Route
          path="/security-scanner"
          element={<SecurityScanner />}
        />

        <Route
          path="/threat-feed"
          element={<ThreatFeed />}
        />

        <Route
          path="/compliance"
          element={<Compliance />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/ai-copilot"
          element={<AICopilot />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
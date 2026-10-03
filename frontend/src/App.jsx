import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CloudResources from "./pages/CloudResources";
import ResourceDetails from "./pages/ResourceDetails";
import SecurityScanner from "./pages/SecurityScanner";
import ThreatFeed from "./pages/ThreatFeed";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import AICopilot from "./pages/AICopilot";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Threats from "./pages/Threats";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            Authentication Routes
        ========================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            Protected / Main Layout
        ========================== */}

        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Cloud Resources */}
          <Route
            path="/cloud-resources"
            element={<CloudResources />}
          />

          {/* Cloud Resource Details */}
          <Route
            path="/cloud-resources/:id"
            element={<ResourceDetails />}
          />

          {/* Security Scanner */}
          <Route
            path="/security-scanner"
            element={<SecurityScanner />}
          />

          {/* Threat Feed */}
          <Route
            path="/threat-feed"
            element={<ThreatFeed />}
          />

          {/* Threat Management */}
          <Route
            path="/threats"
            element={<Threats />}
          />

          {/* Compliance */}
          <Route
            path="/compliance"
            element={<Compliance />}
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={<Reports />}
          />

          {/* AI Copilot */}
          <Route
            path="/ai-copilot"
            element={<AICopilot />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        {/* =========================
            Unknown URL
        ========================== */}

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
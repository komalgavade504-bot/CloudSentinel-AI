import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import {
  FiShield,
  FiGrid,
  FiCloud,
  FiCrosshair,
  FiActivity,
  FiCheckSquare,
  FiFileText,
  FiCpu,
  FiSettings,
  FiChevronsLeft,
  FiChevronsRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: FiGrid,
    path: "/dashboard",
  },
  {
    label: "Cloud Resources",
    icon: FiCloud,
    path: "/cloud-resources",
  },
  {
    label: "Security Scanner",
    icon: FiCrosshair,
    path: "/security-scanner",
  },
  {
    label: "Threat Feed",
    icon: FiActivity,
    path: "/threat-feed",
  },
  {
    label: "Compliance",
    icon: FiCheckSquare,
    path: "/compliance",
  },
  {
    label: "Reports",
    icon: FiFileText,
    path: "/reports",
  },
  {
    label: "AI Copilot",
    icon: FiCpu,
    path: "/ai-copilot",
  },
  {
    label: "Settings",
    icon: FiSettings,
    path: "/settings",
  },
  {
  label: "Profile",
  icon: FiUser,
  path: "/profile",
}
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <FiShield className="text-cyan-400" size={22} />
          <span className="font-bold tracking-wider text-white">
            CloudSentinel AI
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="text-slate-300"
        >
          <FiMenu size={22} />
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r border-slate-800 bg-slate-900
          transition-all duration-300

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          <div className="flex items-center gap-3">
            <FiShield
              className="text-cyan-400"
              size={22}
            />

            {!collapsed && (
              <span className="font-bold tracking-wide text-white">
                CloudSentinel
              </span>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <FiX className="text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                  ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 font-semibold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                  ${collapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span>{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="border-t border-slate-800 p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-3 py-3 text-slate-300 transition hover:bg-slate-700 lg:flex"
          >
            {collapsed ? (
              <FiChevronsRight />
            ) : (
              <>
                <FiChevronsLeft />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
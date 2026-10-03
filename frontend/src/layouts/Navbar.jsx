import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function Navbar({
  userName = "Jane Cooper",
  userRole = "Security Administrator",
  notificationCount = 3,
  onSearch,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const profileRef = useRef(null);

  const pageTitleMap = {
    "/dashboard": "Dashboard",
    "/cloud-resources": "Cloud Resources",
    "/security-scanner": "Security Scanner",
    "/threat-feed": "Threat Feed",
    "/reports": "Reports",
    "/compliance": "Compliance",
    "/ai-copilot": "AI Copilot",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  const pageTitle =
    pageTitleMap[location.pathname] || "CloudSentinel AI";

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch?.(search);
  };

  const initials = userName
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900">
      <div className="flex h-16 items-center gap-4 px-6">

        {/* Page Title */}
        <h1 className="text-xl font-bold text-white">
          {pageTitle}
        </h1>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden flex-1 justify-center md:flex"
        >
          <div className="flex w-full max-w-lg items-center rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">

            <FiSearch className="mr-3 text-slate-400" />

            <input
              type="text"
              placeholder="Search resources, findings, CVEs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-500 outline-none"
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3">

          {/* Mobile Search */}
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 md:hidden">
            <FiSearch size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >
            {darkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800">

            <FiBell size={18} />

            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-slate-700"></div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
                {initials}
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold text-white">
                  {userName}
                </p>

                <p className="text-xs text-slate-400">
                  {userRole}
                </p>
              </div>

              <FiChevronDown
                className={`text-slate-400 transition ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-xl">

                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
                >
                  <FiUser />
                  View Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
                >
                  <FiSettings />
                  Settings
                </button>

                <hr className="border-slate-700" />

                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-red-500/10"
                >
                  <FiLogOut />
                  Logout
                </button>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
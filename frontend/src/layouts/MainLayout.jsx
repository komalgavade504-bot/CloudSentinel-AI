import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64 flex min-h-screen flex-col transition-all duration-300">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
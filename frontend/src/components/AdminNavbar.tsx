import { ClipboardPlus, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAdminStore } from "@/hooks/useAdminStore";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { logoutAdmin } = useAdminStore();

  const handleLogout = async () => {
    await logoutAdmin(navigate);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 w-screen z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        {/* Logo / Title */}
        <Link
          to="/admin/dashboard"
          className="logo"
        >
          <p className="tracking-wide">Admin Dashboard</p>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-10 mt-3 sm:mt-0">
          <Link to="/admin/list/doctor" className="link">Doctors List</Link>
          
          <Button className="hover:shadow-md active:shadow-sm transition-shadow">
            <Link
            to="/admin/add-doctor"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500"
          >
            <ClipboardPlus className="w-5 h-5" />
            <span>Add Doctor</span>
          </Link>
          </Button>

          <Button
            onClick={handleLogout}
            className="text-btn-danger cursor-pointer hover:shadow-md active:shadow-sm transition-shadow"
            aria-label="Logout"
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

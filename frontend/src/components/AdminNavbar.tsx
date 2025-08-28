import { ClipboardPlus, LayoutDashboard, List, LogOutIcon, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAdminStore } from "@/hooks/useAdminStore";
import { useState } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const logoutAdmin = useAdminStore((state) => state.logoutAdmin);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin(navigate);
  };

  return (
    <nav className="navbar">
      <div className="w-screen flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <div className="flex logo">
              <img src="/assets/icons/logo-icon.svg" />
              <p className="tracking-wide">EasyCare</p>
            </div>
          </Link>

          <Link to="/admin/dashboard" className="text-xs font-semibold tracking-wide text-teal-500">Admin panel</Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
          `sidebar-nav-link flex ${
            isActive ? "text-indigo-500" : "text-primary"
          }`
        }
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard className="size-5" />
            Dashboard
          </NavLink>
          
          <NavLink to="/admin/list/doctor" className={({ isActive }) =>
          `link ${
            isActive ? "text-indigo-500" : "text-primary"
          }`
        }>
            <List className="w-5 h-5" />
            Manage doctors
          </NavLink>

          <NavLink
            to="/admin/add-doctor"
            className={({ isActive }) =>
          `link flex ${
            isActive ? "text-indigo-500" : "text-primary"
          }`
        }
          >
            <ClipboardPlus className="w-5 h-5" />
            <span>Add Doctor</span>
          </NavLink>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-btn-danger flex items-center gap-1 hover:shadow-md active:shadow-sm transition-shadow"
            aria-label="Logout"
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-[70vw] max-w-xs bg-white shadow-lg z-50 p-5 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4">
          <X
            onClick={() => setMenuOpen(false)}
            className="w-6 h-6 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          />
        </div>

        <div className="flex flex-col gap-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
          `sidebar-nav-link flex ${
            isActive ? "text-indigo-500" : ""
          }`
        }
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard className="size-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/list/doctor"
            className={({ isActive }) =>
          `sidebar-nav-link flex ${
            isActive ? "text-indigo-500" : ""
          }`
        }
            onClick={() => setMenuOpen(false)}
          >
            <List className="size-5" />
            Manage doctors
          </NavLink>

          <NavLink
            to="/admin/add-doctor"
           className={({ isActive }) =>
          `sidebar-nav-link flex ${
            isActive ? "text-indigo-500" : ""
          }`
        }
            onClick={() => setMenuOpen(false)}
          >
            <ClipboardPlus className="w-5 h-5" />
            <span>Add Doctor</span>
          </NavLink>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="sidebar-nav-link text-btn-danger hover:text-rose-600"
          >
            <LogOutIcon className="w-4 h-4 inline-block mr-1" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import {
  CalendarPlus,
  ClipboardList,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const { patient, setPatient } = useFormStore();

  const handleLogout = () => {
    logout(navigate);
    setPatient(null);
    navigate("/");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <div className="flex logo">
            <img src="/assets/icons/logo-icon.svg" />
            <p className="tracking-wide">EasyCare</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {!user && (
            <Link className="link btn-primary" to="/login">
              <LogIn className="size-5" />
              Login
            </Link>
          )}
          {user && !patient && (
            <div className="flex items-center gap-1">
              <NavLink
                to="/medical-form"
                className={({ isActive }) =>
                  `nav-link flex ${
                    isActive ? "text-teal-600" : "text-primary-text"
                  }`
                }
              >
                <UserPlus className="size-5" />
                Register as patient
              </NavLink>
            </div>
          )}
          {user && patient && (
            <NavLink
              to="/book-appointment"
              className={({ isActive }) =>
                `nav-link flex ${isActive ? "text-teal-600" : "text-primary-text"}`
              }
            >
              <CalendarPlus className="size-5" />
              Book Appointment
            </NavLink>
          )}
          {user && patient && (
            <NavLink to="/profile" className={({ isActive }) =>
                  `nav-link hidden md:flex ${isActive ? "text-teal-600" : "text-primary-text"}`
                }>
              <ClipboardList className="size-5" />
              Profile
            </NavLink>
          )}
          {user && (
            <Button
              onClick={handleLogout}
              className="btn-logout cursor-pointer md:flex hidden"
            >
              <LogOut className="size-5" />
              Logout
            </Button>
          )}
          {!user && (
            <Link
              to="/admin"
              className="text-teal-500 font-semibold tracking-wide text-sm md:inline hidden"
            >
              Admin
            </Link>
          )}
          {!menuOpen && (
            <Menu
              onClick={() => {
                setMenuOpen(true);
              }}
              className="cursor-pointer md:hidden hover:scale-105 active:scale-95 transition-all"
            />
          )}
        </div>
      </div>

      <div
        className={`sidebar-nav ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <X
          onClick={() => {
            setMenuOpen(false);
          }}
          className="self-end cursor-pointer hover:scale-105 active:scale-95 transition-all"
        />
        <div className="flex flex-col gap-4">
          {user && patient && (
            <Link to="/profile" className="sidebar-nav-link">
              <ClipboardList className="size-5" />
              Profile
            </Link>
          )}
          {user && (
            <button onClick={handleLogout} className="link text-btn-danger hover:text-rose-600">
              <LogOut className="size-5" />
              Logout
            </button>
          )}
          {!user && (
            <Link
              to="/admin"
              className="text-teal-500 font-semibold tracking-wide text-sm"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

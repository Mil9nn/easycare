import { Link, NavLink } from "react-router-dom";
import {
  CalendarPlus,
  ClipboardList,
  LogOut,
  Stethoscope,
} from "lucide-react";
import type { NavbarProps } from "./Navbar";

const NavbarSidebarLinks = ({ isLoggedIn, isPatient, handleLogout }: NavbarProps) => {
  return (
    <div className="flex flex-col gap-2">
      {isLoggedIn && isPatient && (
        <Link to="/profile" className="sidebar-nav-link">
          <ClipboardList className="size-5" />
          Profile
        </Link>
      )}

      {isLoggedIn && isPatient && (
        <NavLink
          to="/book-appointment"
          className={({ isActive }) =>
            `sidebar-nav-link flex ${
              isActive ? "text-teal-600" : "text-primary-text"
            }`
          }
        >
          <CalendarPlus className="size-5" />
          Book appointment
        </NavLink>
      )}

      <Link className="sidebar-nav-link" to="/doctors">
        <Stethoscope className="size-5" />
        All doctors
      </Link>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="link text-btn-danger hover:text-rose-600"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      ) : (
        <Link
          to="/admin"
          className="text-teal-500 font-semibold tracking-wide text-sm"
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default NavbarSidebarLinks;

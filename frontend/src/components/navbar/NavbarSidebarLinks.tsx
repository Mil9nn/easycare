import { Link, NavLink } from "react-router-dom";
import { CalendarPlus, ClipboardIcon, ClipboardList, LogOut, Stethoscope } from "lucide-react";
import type { NavbarProps } from "./Navbar";

const NavbarSidebarLinks = ({
  isLoggedIn,
  isPatient,
  handleLogout,
  setMenuOpen,
  patientId,
}: NavbarProps) => {

  return (
    <div className="flex flex-col gap-2">
      {isLoggedIn && isPatient && (
        <NavLink
          to="/profile"
          onClick={() => setMenuOpen?.(false)}
          className={({ isActive }) =>
            `sidebar-nav-link flex ${
              isActive ? "text-indigo-500" : "text-primary-text"
            }`
          }
        >
          <ClipboardList className="size-5" />
          Profile
        </NavLink>
      )}

      {isLoggedIn && isPatient && (
        <NavLink
          to="/book-appointment"
          onClick={() => setMenuOpen?.(false)}
          className={({ isActive }) =>
            `sidebar-nav-link flex ${
              isActive ? "text-indigo-500" : "text-primary-text"
            }`
          }
        >
          <CalendarPlus className="size-5" />
          Book appointment
        </NavLink>
      )}

      {isLoggedIn && isPatient && (
        <NavLink
          to={`/appointments/${patientId}`}
          onClick={() => setMenuOpen?.(false)}
          className={({ isActive }) =>
            `sidebar-nav-link flex ${
              isActive ? "text-indigo-500" : "text-primary-text"
            }`
          }
        >
          <ClipboardIcon className="size-5" />
          Appointment history
        </NavLink>
      )}

      <NavLink
        className={({ isActive }) =>
          `sidebar-nav-link flex ${
            isActive ? "text-indigo-500" : "text-primary-text"
          }`
        }
        to="/doctors"
        onClick={() => setMenuOpen?.(false)}
      >
        <Stethoscope className="size-5" />
        All doctors
      </NavLink>

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
          className="pl-3 text-teal-500 font-semibold tracking-wide text-sm"
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default NavbarSidebarLinks;

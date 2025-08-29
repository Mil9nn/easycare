import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
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
          to={`/appointments/${patientId}`}
          onClick={() => setMenuOpen?.(false)}
          className={({ isActive }) =>
            `sidebar-nav-link flex ${
              isActive ? "text-indigo-500" : ""
            }`
          }
        >
          <LayoutDashboard className="size-5" />
          Patient Dashboard
        </NavLink>
      )}

      <NavLink
        className={({ isActive }) =>
          `sidebar-nav-link flex ${
            isActive ? "text-indigo-500" : ""
          }`
        }
        to="/doctors"
        onClick={() => setMenuOpen?.(false)}
      >
        All Doctors
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

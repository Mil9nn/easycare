import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import {
  LogIn,
  LogOut,
  ClipboardList,
  CalendarPlus,
  UserPlus,
  Stethoscope,
} from "lucide-react";
import type { NavbarProps } from "./Navbar";

const NavbarDesktopLinks = ({ isLoggedIn, isPatient, handleLogout }: NavbarProps) => {
  return (
    <>
      <Link className="nav-link flex items-center" to="/doctors">
        <Stethoscope className="size-5" />
        All doctors
      </Link>

      {!isLoggedIn && (
        <>
          <Link className="link btn-primary" to="/login">
            <LogIn className="size-5" />
            <span>Login</span>
          </Link>
          <Link
            to="/admin"
            className="text-teal-500 font-semibold tracking-wide text-sm hidden md:inline"
          >
            <span>Admin</span>
          </Link>
        </>
      )}

      {isLoggedIn && !isPatient && (
        <NavLink
          to="/medical-form"
          className={({ isActive }) =>
            `nav-link flex ${isActive ? "text-indigo-500" : "text-primary-text"}`
          }
        >
          <UserPlus className="size-5" />
          Register as patient
        </NavLink>
      )}

      {isLoggedIn && isPatient && (
        <>
          <NavLink
            to="/book-appointment"
            className={({ isActive }) =>
              `nav-link hidden md:flex ${
                isActive ? "text-indigo-500" : "text-primary-text"
              }`
            }
          >
            <CalendarPlus className="size-5" />
            Book appointment
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link hidden md:flex ${
                isActive ? "text-indigo-500" : "text-primary-text"
              }`
            }
          >
            <ClipboardList className="size-5" />
            Profile
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <Button onClick={handleLogout} className="btn-logout hidden md:flex">
          <LogOut className="size-5" />
          Logout
        </Button>
      )}
    </>
  );
};

export default NavbarDesktopLinks;

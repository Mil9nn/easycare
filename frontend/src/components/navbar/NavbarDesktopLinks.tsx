import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  LogIn,
  LogOut,
  ClipboardList,
  CalendarPlus,
  UserPlus,
  Stethoscope,
  Home,
} from "lucide-react";
import type { NavbarProps } from "./Navbar";
import { useEffect, useRef, useState } from "react";

const NavbarDesktopLinks = ({
  isLoggedIn,
  isPatient,
  handleLogout,
}: NavbarProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeRef = linkRefs.current[location.pathname];
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (activeRef && containerRect) {
      const linkRect = activeRef.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  }, [location.pathname]);

  const RenderLinks = ({
    isLoggedIn,
    isPatient,
  }: {
    isLoggedIn: boolean;
    isPatient: boolean;
  }) => {
    const trackedPaths = [
      { name: "", path: "/", icon: Home, show: true, className: "hidden" },
      { name: "All doctors", path: "/doctors", icon: Stethoscope, show: true, className: "hidden md:flex" },
      {
        name: "Book appointment",
        path: "/book-appointment",
        icon: CalendarPlus,
        show: isLoggedIn && isPatient,
        className: "hidden md:flex",
      },
      {
        name: "Profile",
        path: "/profile",
        icon: ClipboardList,
        show: isLoggedIn && isPatient,
        className: "hidden md:flex",
      },
      {
        name: "Register as patient",
        path: "/medical-form",
        icon: UserPlus,
        show: isLoggedIn && !isPatient,
      },
    ];

    return (
      <div className="flex items-center gap-4">
        {trackedPaths
          .filter((link) => link.show)
          .map((trackedPath) => (
            <NavLink
              key={trackedPath.path}
              to={trackedPath.path}
              ref={(el) => {if (el) (linkRefs.current[trackedPath.path] = el)}}
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 ${
                  trackedPath.className || ""
                } ${isActive ? "text-indigo-500" : "text-primary-text"}`
              }
            >
              <trackedPath.icon className="size-5" />
              {trackedPath.name}
            </NavLink>
          ))}
      </div>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-4">
        <RenderLinks isLoggedIn={isLoggedIn} isPatient={isPatient} />

        {!isLoggedIn && (
          <>
            <Link className="btn-primary" to="/login">
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

        {isLoggedIn && (
          <Button onClick={handleLogout} className="btn-logout hidden md:flex">
            <LogOut className="size-5" />
            Logout
          </Button>
        )}
      </div>

      {/* === UNDERLINE INDICATOR === */}
      <div
        className="absolute -bottom-5 h-[2.5px] bg-indigo-500 rounded-full transition-all duration-300"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </div>
  );
};

export default NavbarDesktopLinks;

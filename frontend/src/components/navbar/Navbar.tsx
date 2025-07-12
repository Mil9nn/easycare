import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarSidebarLinks from "./NavbarSidebarLinks";

export type NavbarProps = {
  isLoggedIn: boolean;
  isPatient: boolean;
  handleLogout: () => void;
}

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const patient = useFormStore((state) => state.patient);
  const setPatient = useFormStore((state) => state.setPatient);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(navigate);
    setPatient(null);
    navigate("/");
  };

  const isLoggedIn = !!user;
  const isPatient = !!patient;

  return (
    <div>
      {/* Top Navbar */}
      <div className="navbar">
        <Link to="/" className="flex logo">
          <img src="/assets/icons/logo-icon.svg" />
          <p className="tracking-wide">EasyCare</p>
        </Link>

        <div className="flex items-center gap-4">
          <NavbarDesktopLinks
            isLoggedIn={isLoggedIn}
            isPatient={isPatient}
            handleLogout={handleLogout}
          />

          {!menuOpen && (
            <Menu
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer md:hidden hover:scale-105 active:scale-95 transition-all"
            />
          )}
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className={`sidebar-nav ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <X
          onClick={() => setMenuOpen(false)}
          className="self-end cursor-pointer hover:scale-105 active:scale-95 transition-all"
        />
        <NavbarSidebarLinks
          isLoggedIn={isLoggedIn}
          isPatient={isPatient}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;

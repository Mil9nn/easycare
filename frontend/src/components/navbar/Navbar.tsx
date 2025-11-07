import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarSidebarLinks from "./NavbarSidebarLinks";

export interface NavbarProps {
  isLoggedIn: boolean;
  isPatient: boolean;
  handleLogout: () => void;
  setMenuOpen?: (open: boolean) => void;
  patientId?: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const patient = useFormStore((state) => state.patient);
  const setPatient = useFormStore((state) => state.setPatient);
  const patientId = useFormStore((state) => state.patient?._id);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(navigate);
    setPatient(null);
    navigate("/");
  };

  const isLoggedIn = !!user;
  const isPatient = !!patient;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white"> 

      
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 shadow-md">
        {/* Logo + Branding */}
        <div className="flex items-center gap-2 group">
          <img src="/assets/icons/logo-icon.svg" alt="EasyCare Logo" className="w-8 h-8" />
          <p className="text-lg font-semibold text-teal-500 tracking-tight">
            EasyCare
          </p>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavbarDesktopLinks
            isLoggedIn={isLoggedIn}
            isPatient={isPatient}
            handleLogout={handleLogout}
            patientId={patientId}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 text-gray-900 hover:bg-[#457B9D] rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[white] text-gray-800 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 h-full">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end p-2 hover:bg-[#457B9D] rounded-lg transition-colors"
          >
            <X size={24} />
          </button>

          {/* Sidebar Links */}
          <div className="mt-8 space-y-4">
            <NavbarSidebarLinks
              isLoggedIn={isLoggedIn}
              isPatient={isPatient}
              handleLogout={handleLogout}
              setMenuOpen={setMenuOpen}
              patientId={patientId}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

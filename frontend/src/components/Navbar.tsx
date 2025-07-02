import { useAuthStore } from "@/components/hooks/useAuthStore";
import { useFormStore } from "@/components/hooks/useFormStore";
import { LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const { patientData, setPatientData } = useFormStore();

  const handleLogout = () => {
    logout(navigate);
    setPatientData(null);
  };

  return (
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
        {!patientData && user && (
          <div className="flex items-center gap-1">
            <Link className="text-sm" to="/medical-form">
              Register as patient
            </Link>
          </div>
        )}
        <Link to="/appointment" className="link nav-link">Book Appointment</Link>
        {user && patientData && <Link to="/profile" className="link nav-link">Profile</Link>}
        {user && (
          <Button onClick={handleLogout} className="btn-logout cursor-pointer">
            <LogOut className="size-5" />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

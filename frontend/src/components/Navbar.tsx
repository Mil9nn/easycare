import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const { patient } = useFormStore();

  const handleLogout = () => {
    logout(navigate);
    navigate("/");
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
        {user && !patient && (
          <div className="flex items-center gap-1">
            <Link className="link nav-link" to="/medical-form">
              Register as patient
            </Link>
          </div>
        )}
        {user && patient && <Link to="/book-appointment" className="link nav-link">Book Appointment</Link>}
        {user && patient && <Link to="/profile" className="link nav-link">Profile</Link>}
        {user && (
          <Button onClick={handleLogout} className="btn-logout cursor-pointer">
            <LogOut className="size-5" />
            Logout
          </Button>
        )}
        <Link to="/admin" className="text-teal-500 font-semibold tracking-wide text-sm">Admin</Link>
      </div>
    </div>
  );
};

export default Navbar;

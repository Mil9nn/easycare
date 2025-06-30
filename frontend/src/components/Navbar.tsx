import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthStore();
  const { patientData } = useFormStore();
  
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
          <div className="flex items-center gap-1">
            <LogIn className="size-5" />
            <Link className="text-sm" to="/login">
              Login
            </Link>
          </div>
        )}
        {!patientData && <div className="flex items-center gap-1">
          <Link className="text-sm" to="/medical-form">
            Register as patient
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;

import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="flex">
        <img src="/assets/icons/logo-icon.svg" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <LogIn className="size-5" />
          <Link className="text-sm" to="/login">
            Login
          </Link>
        </div>
        <p>Health details</p>
      </div>
    </div>
  );
};

export default Navbar;

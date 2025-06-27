import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="flex"></div>
      <div className="flex items-center gap-5">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;

import AdminNavbar from "@/components/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="mt-25">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

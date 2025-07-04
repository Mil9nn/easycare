import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-22">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

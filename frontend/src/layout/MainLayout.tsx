import Navbar from "@/components/ui/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

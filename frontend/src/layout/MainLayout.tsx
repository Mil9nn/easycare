import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-22">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout

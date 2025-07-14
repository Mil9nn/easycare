import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-21">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout

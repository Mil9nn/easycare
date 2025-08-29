import Chatbot from "@/components/chat/Chatbot"
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16 bg-[#F1FAEE]">
        <Outlet />
      </div>
      <div className="absolute z-20 bottom-0 right-0">
        <Chatbot />
      </div>
    </>
  )
}

export default MainLayout

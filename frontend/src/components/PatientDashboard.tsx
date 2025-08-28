import { useState } from "react";
import { UserCircle, Calendar, ArrowLeftCircle } from "lucide-react";
import ProfilePage from "@/pages/ProfilePage";
import AppointmentHistory from "./AppointmentHistory";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "history">("profile");

  return (
    <div className="min-h-screen bg-[#F1FAEE] flex">
      {/* Sidebar */}
      <aside className="md:w-64 w-20 h-screen sticky bg-[#1D3557] text-white flex flex-col py-8 shadow-lg">
        <h2 className="flex items-center gap-2 text-2xl font-semibold px-6 mb-8">
          <Link to="/">
            <ArrowLeftCircle className="hover:text-blue-500" />
          </Link>
          <span className="hidden md:inline">Patient Dashboard</span>
        </h2>

        <nav className="flex flex-col gap-2 px-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${
                activeTab === "profile"
                  ? "bg-[#457B9D] text-white"
                  : "text-gray-200 hover:bg-[#457B9D]/70"
              }`}
          >
            <UserCircle size={20} />
            <span className="hidden md:inline">Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${
                activeTab === "history"
                  ? "bg-[#457B9D] text-white"
                  : "text-gray-200 hover:bg-[#457B9D]/70"
              }`}
          >
            <Calendar size={20} />
            <span className="hidden md:inline">Appointment History</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:p-6 overflow-y-auto h-screen">
        {activeTab === "profile" && <ProfilePage />}
        {activeTab === "history" && <AppointmentHistory />}
      </main>
    </div>
  );
};

export default PatientDashboard;

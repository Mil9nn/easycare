import { AnalyticsChart } from "@/components/AnalyticsChart";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAdminStore } from "@/hooks/useAdminStore";
import { useAppointmentStore } from "@/hooks/useAppoiontmentStore";
import { LogOutIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    logoutAdmin,
    getAdminDashboardData,
    getWeeklyAppointments,
    dashboardData,
    patientStats,
    getPatientsByAgeGroup,
  } = useAdminStore();

  const { getAllAppointments, appointments } = useAppointmentStore();

  const handleLogout = async () => {
    await logoutAdmin(navigate);
  };

  useEffect(() => {
    getAllAppointments();
    getAdminDashboardData();
    getWeeklyAppointments();
    getPatientsByAgeGroup();
  }, [
    getAllAppointments,
    getAdminDashboardData,
    getWeeklyAppointments,
    getPatientsByAgeGroup,
  ]);

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <p className="text-lg font-semibold text-gray-800">Admin Dashboard</p>
        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 text-rose-500 text-sm font-bold hover:shadow-lg cursor-pointer"
          aria-label="Logout"
        >
          <LogOutIcon className="w-4 h-4" />
          Logout
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-1 px-5">
        Monitor and manage all patient appointments and system activity. Use the
        analytics below to stay on top of pending tasks and overall system
        health.
      </p>
      <ScrollArea className="w-full">
        <div className="grid grid-cols-4 gap-4 p-5 min-w-[1024px] lg:min-w-0">
          <StatCard
            iconSrc="/assets/icons/appointments.svg"
            iconAlt=""
            count={dashboardData?.scheduled}
            description="Total number of scheduled appointments"
            trendPercentage={5}
            trend="down"
            cardBg="bg-gradient-to-r from-yellow-100 to white"
          />
          <StatCard
            iconSrc="/assets/icons/pending.svg"
            iconAlt=""
            count={dashboardData?.pending}
            description="Total number of pending appointments"
            trendPercentage={5}
            trend="down"
            cardBg="bg-gradient-to-r from-blue-100 to white"
          />
          <StatCard
            iconSrc="/assets/icons/cancelled.svg"
            iconAlt=""
            count={dashboardData?.cancelled}
            description="Cancelled appointments"
            trendPercentage={70}
            trend="up"
            cardBg="bg-gradient-to-r from-red-100 to white"
          />
          <StatCard
            iconSrc="/assets/icons/appointments.svg"
            iconAlt=""
            count={patientStats?.length || 0}
            description="Patients"
            trendPercentage={5}
            trend="down"
            cardBg="bg-gradient-to-r from-green-100 to white"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="w-full">
        <div className="p-5 min-w-[1024px] lg:min-w-0">
          <AnalyticsChart />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="container mx-auto py-10 p-5">
        <DataTable columns={columns} data={appointments} />
      </div>
    </div>
  );
};

export default AdminDashboard;

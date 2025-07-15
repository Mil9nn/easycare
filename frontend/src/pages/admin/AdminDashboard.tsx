import { AnalyticsChart } from "@/components/AnalyticsChart";
import StatCard from "@/components/StatCard";
import { getColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAdminStore } from "@/hooks/useAdminStore";
import { useAppointmentStore } from "@/hooks/useAppointmentStore";
import { useEffect } from "react";

const AdminDashboard = () => {

  const getAdminDashboardData = useAdminStore((state) => state.getAdminDashboardData);
  const getWeeklyAppointments = useAdminStore((state) => state.getWeeklyAppointments);
  const dashboardData = useAdminStore((state) => state.dashboardData);
  const patientStats = useAdminStore((state) => state.patientStats);
  const getPatientsByAgeGroup = useAdminStore((state) => state.getPatientsByAgeGroup);
  const doctors = useAdminStore((state) => state.doctors);

  const getAllAppointments = useAppointmentStore((state) => state.getAllAppointments);
  const appointments = useAppointmentStore((state) => state.appointments);

  const columns = getColumns(doctors!)

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

  const percentageScheduled = dashboardData?.scheduled ? Number(((dashboardData.scheduled / (dashboardData.scheduled + dashboardData.pending + dashboardData.cancelled)) * 100).toFixed(1)) : 0;
  const percentagePending = dashboardData?.pending ? Number(((dashboardData.pending / (dashboardData.scheduled + dashboardData.pending + dashboardData.cancelled)) * 100).toFixed(1)) : 0;
  const percentageCancelled = dashboardData?.cancelled ? Number(((dashboardData.cancelled / (dashboardData.scheduled + dashboardData.pending + dashboardData.cancelled) * 100)).toFixed(1)) : 0;

  return (
    <div>
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
            trendPercentage={percentageScheduled}
            type="scheduled"
            cardBg="bg-gradient-to-r from-yellow-100 to white"
          />
          <StatCard
            iconSrc="/assets/icons/pending.svg"
            iconAlt=""
            count={dashboardData?.pending}
            description="Total number of pending appointments"
            trendPercentage={percentagePending}
            type="pending"
            cardBg="bg-gradient-to-r from-blue-100 to white"
          />
          <StatCard
            iconSrc="/assets/icons/cancelled.svg"
            iconAlt=""
            count={dashboardData?.cancelled}
            description="Cancelled appointments"
            trendPercentage={percentageCancelled}
            type="cancelled"
            cardBg="bg-gradient-to-r from-red-100 to white"
          />
          <StatCard
            iconSrc="/assets/icons/appointments.svg"
            iconAlt=""
            count={patientStats?.length || 0}
            description="Patients"
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

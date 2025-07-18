import { useAdminStore } from "@/hooks/useAdminStore";
import type { PatientStats } from "@/types/types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#00C49F", "#F44336", "#FFC107"];

export function AnalyticsChart() {
  const dashboardData = useAdminStore((state) => state.dashboardData);
  const weeklyAppointments = useAdminStore((state) => state.weeklyAppointments);
  const patientStats = useAdminStore((state) => state.patientStats);

  const lineData = [
    { name: "Mon", appointments: weeklyAppointments?.[1]?.count || 0 },
    { name: "Tue", appointments: weeklyAppointments?.[2]?.count || 0 },
    { name: "Wed", appointments: weeklyAppointments?.[3]?.count || 0 },
    { name: "Thu", appointments: weeklyAppointments?.[4]?.count || 0 },
    { name: "Fri", appointments: weeklyAppointments?.[5]?.count || 0 },
    { name: "Sat", appointments: weeklyAppointments?.[6]?.count || 0 },
  ];

  const pieData = [
    { name: "Confirmed", value: dashboardData?.scheduled ?? 0 },
    { name: "Cancelled", value: dashboardData?.cancelled ?? 0 },
    { name: "Pending", value: dashboardData?.pending ?? 0 },
  ];

  const barData = patientStats?.map((group: PatientStats) => ({
    name: group._id,
    patients: group.count,
  }));

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Appointments this week</h3>
        <ResponsiveContainer
          className="text-xs font-medium"
          width="100%"
          height={250}
        >
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#14b8a6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Appointment status</h3>
        <ResponsiveContainer
          className="text-xs font-medium"
          width="100%"
          height={250}
        >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              label
            >
              {pieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              iconType="circle"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Patients by age group</h3>
        <ResponsiveContainer
          className="text-xs font-medium"
          width="100%"
          height={250}
        >
          <BarChart width={500} height={300} data={barData} barSize={35}>
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 20, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="patients"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

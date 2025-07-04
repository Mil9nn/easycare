import { useAdminStore } from "@/hooks/useAdminStore";
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

const lineData = [
  { name: "Mon", appointments: 5 },
  { name: "Tue", appointments: 8 },
  { name: "Wed", appointments: 3 },
  { name: "Thu", appointments: 6 },
  { name: "Fri", appointments: 9 },
  { name: "Sat", appointments: 4 },
];

const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

const barData = [
  { name: "0 - 18", patients: 120 },
  { name: "19 - 35", patients: 300 },
  { name: "36 - 50", patients: 220 },
  { name: "51 - 66", patients: 180 },
  { name: "67+", patients: 90 },
];

export function AnalyticsChart() {
  const { dashboardData } = useAdminStore();

  const pieData = [
  { name: "Confirmed", value: dashboardData?.scheduled },
  { name: "Cancelled", value: dashboardData?.cancelled },
  { name: "Pending", value: dashboardData?.pending },
];

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Appointments this week</h3>
        <ResponsiveContainer className="text-xs font-medium" width="100%" height={250}>
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
        <ResponsiveContainer className="text-xs font-medium" width="100%" height={250}>
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
              {pieData.map((entry, index) => (
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
        <ResponsiveContainer className="text-xs font-medium" width="100%" height={250}>
          <BarChart
            width={500}
            height={300}
            data={barData}
            barSize={35}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 20, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="patients" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

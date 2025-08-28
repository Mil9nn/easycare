import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import { SignupPage } from "./components/authentication/SignupPage";
import { LoginPage } from "./components/authentication/LoginPage";
import { Toaster } from "react-hot-toast";
import { MedicalForm } from "./components/form/MedicalForm";
import { useEffect } from "react";
import { useAuthStore } from "./hooks/useAuthStore";
import ProfilePage from "./pages/ProfilePage";
import BookAppointment from "./pages/BookAppointment";
import SuccessPage from "./pages/SuccessPage";
import { useFormStore } from "./hooks/useFormStore";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAdminStore } from "./hooks/useAdminStore";
import { DoctorForm } from "./components/doctor/DoctorForm";
import AdminLayout from "./layout/AdminLayout";
import DoctorsList from "./components/doctor/DoctorsList";
import ManageDoctors from "./pages/admin/ManageDoctors";
import {
  AdminRoute,
  PatientRoute,
  ProtectRoute,
} from "./components/ProtectedRoute";
import AppointmentPage from "./pages/AppointmentPage";
import AllDoctors from "./components/doctor/AllDoctors";
import AdminPage from "./pages/admin/AdminPage";
import ScrollToTop from "./components/ScrolltoTop";
import { socket } from "./lib/socket";
import { setupAppointmentSocketListeners } from "./lib/setupAppointmentSocketListener";
import AppointmentHistory from "./components/AppointmentHistory";
import PatientDialogue from "./components/PatientDialogue";
import Patient from "./components/Patient";
import PatientDashboard from "./components/PatientDashboard";

const SocketManager = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Socket connected:", socket.id);
      }
    });

    socket.on("disconnect", (reason) => {
      if (process.env.NODE_ENV === "development") {
        console.log("❌ Socket disconnected:", reason);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

function App() {
  useEffect(() => {
    setupAppointmentSocketListeners();
  }, []);

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const user = useAuthStore((state) => state.user);

  const getPatient = useFormStore((state) => state.getPatient);

  const getAllDoctors = useAdminStore((state) => state.getAllDoctors);
  const checkAdmin = useAdminStore((state) => state.checkAdmin);

  useEffect(() => {
    checkAuth();
    checkAdmin();
  }, [checkAuth, checkAdmin]);

  useEffect(() => {
    if (user) {
      getPatient();
    }
    getAllDoctors();
  }, [user, getPatient, getAllDoctors]);

  return (
    <>
      <SocketManager />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Home />
                  <SignupPage />
                </>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Home />
                  <LoginPage />
                </>
              )
            }
          />

          <Route
            path="/medical-form"
            element={
              <ProtectRoute>
                <MedicalForm />
              </ProtectRoute>
            }
          />

          <Route path="/success/:appointmentId" element={<SuccessPage />} />

          <Route path="/doctor/:doctorId" element={<AppointmentPage />} />

          <Route path="/doctors" element={<AllDoctors />} />

          <Route
            path="/book-appointment"
            element={
              <PatientRoute>
                <BookAppointment />
              </PatientRoute>
            }
          />
          {/* <Route
            path="/appointments/:patientId"
            element={<AppointmentHistory />}
          /> */}

          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="/appointments/:patientId" element={<PatientDashboard />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="history" element={<AppointmentHistory />} />
        </Route>

        

        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route path="patient/:patientId" element={<PatientDialogue />} />
          </Route>
          <Route
            path="/admin/dashboard/patient/:patientId/page"
            element={<Patient />}
          />
          <Route
            path="/admin/add-doctor"
            element={
              <AdminRoute>
                <DoctorForm mode="add" />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-doctor/:doctorId"
            element={
              <AdminRoute>
                <DoctorForm mode="edit" />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/list/doctor"
            element={
              <AdminRoute>
                <DoctorsList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/list/doctor/:doctorId"
            element={
              <AdminRoute>
                <ManageDoctors />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default App;

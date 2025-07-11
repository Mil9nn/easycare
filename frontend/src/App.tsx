import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { Toaster } from "react-hot-toast";
import { MedicalForm } from "./components/form/MedicalForm";
import { useEffect } from "react";
import { useAuthStore } from "./hooks/useAuthStore";
import ProfilePage from "./pages/ProfilePage";
import BookAppointment from "./pages/BookAppointment";
import SuccessPage from "./pages/SuccessPage";
import { useFormStore } from "./hooks/useFormStore";
import AdminPage from "./pages/admin/AdminPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAdminStore } from "./hooks/useAdminStore";
import { DoctorForm } from "./components/DoctorForm";
import AdminLayout from "./layout/AdminLayout";
import DoctorsList from "./components/DoctorsList";
import ManageDoctors from "./pages/admin/ManageDoctors";
import { PatientRoute, ProtectRoute } from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const user = useAuthStore((state) => state.user);

  const getPatient = useFormStore((state) => state.getPatient);

  const adminStatus = useAdminStore((state) => state.adminStatus);
  const getAllDoctors = useAdminStore((state) => state.getAllDoctors);
  const checkAdmin = useAdminStore((state) => state.checkAdmin);
  const isCheckingAdmin = useAdminStore((state) => state.isCheckingAdmin);

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

  if (isCheckingAdmin) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2">Please hold on...</p>
      </div>
    )
  }

  if (adminStatus === false) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
      </div>
    )
  }

  return (
    <>
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

          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <ProfilePage />
              </ProtectRoute>
            }
          />
          <Route path="/success/:appointmentId" element={<SuccessPage />} />

          <Route
            path="/book-appointment"
            element={
              <PatientRoute>
                <BookAppointment />
              </PatientRoute>
            }
          />
          <Route
            path="/admin"
            element={
              adminStatus ? <Navigate to="/admin/dashboard" /> : <AdminPage />
            }
          />
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              adminStatus ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
          <Route
            path="/admin/add-doctor"
            element={
              adminStatus ? (
                <DoctorForm mode="add" />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/edit-doctor/:doctorId"
            element={
              adminStatus ? (
                <DoctorForm mode="edit" />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/list/doctor"
            element={
              adminStatus ? <DoctorsList /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/admin/list/doctor/:doctorId"
            element={
              adminStatus ? <ManageDoctors /> : <Navigate to="/" replace />
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

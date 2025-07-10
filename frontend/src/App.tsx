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
import { Loader2 } from "lucide-react";
import { DoctorForm } from "./components/DoctorForm";
import AdminLayout from "./layout/AdminLayout";
import DoctorsList from "./components/DoctorsList";
import ManageDoctors from "./pages/admin/ManageDoctors";

function App() {
  const { checkAuth, isCheckingAuth, user } = useAuthStore();
  const { getPatient, isLoadingPatient, patient } = useFormStore();
  const { checkAdmin, adminStatus, getAllDoctors } = useAdminStore();

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

  if (isCheckingAuth || isLoadingPatient) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2">Please hold on...</p>
      </div>
    );
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
          <Route path="/medical-form" element={user ? <MedicalForm /> : <Navigate to="/" replace />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/" replace />}
          />
          <Route path="/success/:appointmentId" element={<SuccessPage />} />
          <Route path="/book-appointment" element={patient ? <BookAppointment /> : <Navigate to="/" replace />} />
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
          <Route path="/admin/add-doctor" element={<DoctorForm mode="add" />} />
          <Route path="/admin/edit-doctor/:doctorId" element={<DoctorForm mode="edit" />} />
          <Route path="/admin/list/doctor" element={<DoctorsList />} />
          <Route path="/admin/list/doctor/:doctorId" element={<ManageDoctors />} />
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

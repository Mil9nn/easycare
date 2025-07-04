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

function App() {
  const { checkAuth, isCheckingAuth, user } = useAuthStore();
  const { getPatient } = useFormStore();
  const { checkAdmin, adminStatus } = useAdminStore();

  useEffect(() => {
    checkAuth();
    checkAdmin();
  }, [checkAuth, checkAdmin]);

  useEffect(() => {
    if (user) {
      getPatient();
    }
  }, [user, getPatient]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-muted via-primary to-muted text-center px-6">
        <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-semibold text-muted-foreground">
          Verifying your identity...
        </h2>
        <p className="text-sm text-gray-500 max-w-xs mt-2">
          Please hold on while we confirm your credentials and secure your
          session.
        </p>
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
          <Route path="/medical-form" element={<MedicalForm />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/" replace />}
          />
          <Route path="/success/:appointmentId" element={<SuccessPage />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/admin" element={adminStatus ? <Navigate to="/admin/dashboard" /> : <AdminPage />} />
        </Route>
        <Route path="/admin/dashboard" element={adminStatus ? <AdminDashboard /> : <Navigate to="/admin" replace />} />
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

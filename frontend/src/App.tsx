import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { Toaster } from "react-hot-toast";
import { MedicalForm } from "./components/form/MedicalForm";
import { useEffect } from "react";
import { useAuthStore } from "./components/hooks/useAuthStore";
import { Loader } from "lucide-react";
import ProfilePage from "./pages/ProfilePage";
import { useFormStore } from "./components/hooks/useFormStore";
import BookAppointment from "./pages/BookAppointment";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const { getPatientData, isLoadingPatientData } = useFormStore();

  useEffect(() => {
    async function initializeApp() {
      await checkAuth();
      await getPatientData();
    }
    initializeApp();
  }, [checkAuth, getPatientData]);

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

  if (isLoadingPatientData) {
    return (
      <div className="bg-primary flex flex-col items-center justify-center h-screen w-screen text-center px-4">
        <Loader className="w-6 h-6 text-accent animate-spin mb-3" />
        <h2 className="text-lg font-medium text-muted-foreground">
          Fetching your medical profile...
        </h2>
        <p className="text-sm text-gray-500 max-w-md mt-2">
          We’re securely retrieving your health records and preferences. This
          helps speed up appointment bookings and ensures personalized care.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary text-textPrimary">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <>
                <Home />
                <SignupPage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Home />
                <LoginPage />
              </>
            }
          />
          <Route path="/appointment" element={<BookAppointment />} />
          <Route path="/medical-form" element={<MedicalForm />} />
          <Route path="/profile" element={<ProfilePage />} />
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
    </div>
  );
}

export default App;

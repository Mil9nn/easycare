import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { Toaster } from "react-hot-toast";
import { MedicalForm } from "./components/form/MedicalForm";

function App() {
  return (
    <div className="bg-primary text-textPrimary">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<><Home /><SignupPage /></>} />
          <Route path="/login" element={<><Home /><LoginPage /></>} />
          <Route path="/medical-form" element={<MedicalForm />} />
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

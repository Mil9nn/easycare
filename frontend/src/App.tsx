import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import { SignupPage } from "./components/ui/SignupPage";
import { LoginPage } from "./components/ui/LoginPage";

function App() {
  return (
    <div className="bg-[#F1FAFB] text-[#2A2A2A]">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;

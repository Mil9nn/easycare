import { useAuthStore } from "@/hooks/useAuthStore";
import { useFormStore } from "@/hooks/useFormStore";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const user = useAuthStore((state) => state.user);

  if (isCheckingAuth) {
    return (
      <div className="h-[85vh] w-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2">Authenticating...</p>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="h-[85vh] w-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2">Please hold on...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export const PatientRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoadingPatient = useFormStore((state) => state.isLoadingPatient);
  const patient = useFormStore((state) => state.patient);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth || isLoadingPatient)
    return (
      <div className="h-[85vh] w-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2"> Loading data...</p>
      </div>
    );

  if (patient === null)
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-teal-500" />
        <p className="text-sm text-gray-500 max-w-xs mt-2">Please hold on...</p>
      </div>
    );

  return patient ? <>{children}</> : <Navigate to="/" replace />;
};

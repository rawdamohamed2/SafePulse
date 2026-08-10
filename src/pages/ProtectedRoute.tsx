import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/store/auth.store.ts";

const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { setUser } = useAuth();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

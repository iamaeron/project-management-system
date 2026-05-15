import { authClient } from "@/lib/auth-client";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) return <div>Loading...</div>;

  // If no session, redirect to login and save the attempted URL
  if (!session) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (
    location.pathname.split("/")[1] == "creator" &&
    !allowedRoles?.includes(session.user.role)
  ) {
    return <Navigate to="/client/dashboard" replace />;
  }

  if (
    location.pathname.split("/")[1] == "client" &&
    !allowedRoles?.includes(session.user.role)
  ) {
    return <Navigate to="/creator/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

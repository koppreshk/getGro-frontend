import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

export const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (!user ? <Navigate to="/login" state={{ pathname: location.pathname }} /> : <Outlet />);
};
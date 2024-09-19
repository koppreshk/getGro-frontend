import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { useModule } from "lib/hooks";

export const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (!user ? <Navigate to="/login" state={{ pathname: location.pathname }} /> : <Outlet />);
};

export const ProtectedConfigurationsRoute = () => {
    const isModuleAccessible = useModule('configurations');

    return (
        isModuleAccessible ? <Outlet /> : <span>You do not have access to this content</span>
    )
}
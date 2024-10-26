import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { useModule } from "lib/hooks";
import { Alert } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { Trans } from "react-i18next";

export const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (!user ? <Navigate to="/login" state={{ pathname: location.pathname }} /> : <Outlet />);
};

export const ProtectedConfigurationsRoute = () => {
    const isModuleAccessible = useModule('configurations');

    return (
        isModuleAccessible ? <Outlet /> : (
            <FlexBox width="100%" height="100%" justifyContent="center" alignItems="center">
                <Alert severity="warning"><Trans i18nkey="access_denied_message"/></Alert>
            </FlexBox>)
    )
}
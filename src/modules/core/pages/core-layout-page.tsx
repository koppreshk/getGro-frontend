import React from "react"
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { FlexBox } from "lib/ui-ux"
import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom"
import { DashboardPage } from "modules/dashboard/pages"
import { TicketsPage } from "modules/tickets/pages"
import { CustomersPage } from "modules/customers/pages"
import { SettingsPage } from "modules/settings/pages"
import { ProtectedRoute } from "modules/login/protected-route"
import { Login, useAuth } from "modules/login"

const HomePage = React.memo(() => {
    return (
        <>
            <Toolbar />
            <FlexBox $width="100%" $height="calc(100% - 65px)">
                <NavigationMenu />
                <div style={{ width: 'calc(100% - 64px)' }}>
                    <Outlet />
                </div>
            </FlexBox>
        </>
    )
})

export const CoreLayoutBase = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        else {
            navigate(location.pathname + location.search ?? '/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route key="root" path="/" element={<HomePage />} >
                    <Route
                        key="dashboard-route"
                        path="dashboard"
                        element={<DashboardPage />} />
                    <Route
                        key="tickets"
                        path="tickets/*"
                        element={<TicketsPage />} />
                    <Route
                        key="customers"
                        path="customers"
                        element={<CustomersPage />} />
                    <Route
                        key="settings"
                        path="settings"
                        element={<SettingsPage />} />
                </Route>
            </Route>
            <Route key="login" path="/login" element={<Login />} />
        </Routes>
    )
}
import React from "react"
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { FlexBox } from "lib/ui-ux"
import { Routes, Route, useNavigate, useLocation, Outlet, Navigate } from "react-router-dom"
import { DashboardPage } from "modules/dashboard/pages"
import { TicketsPage } from "modules/tickets/pages"
import { CustomersPage } from "modules/customers/pages"
import { SettingsPage } from "modules/settings/pages"
import { ProtectedRoute } from "modules/login/protected-route"
import { Login, useAuth } from "modules/login"
import { PageNotFound } from "./page-not-found"

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

export const CoreLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (user && location.pathname === '/login') {
            navigate('/dashboard', { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route key="root" path="/" element={<HomePage />} >
                    <Route
                        key="redirect-route"
                        path="/"
                        element={<Navigate to='/dashboard' />} />
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
            <Route key="not-found" path="*" element={<PageNotFound />} />
        </Routes>
    )
}

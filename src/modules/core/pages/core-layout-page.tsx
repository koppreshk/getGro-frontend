import React from "react"
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { FlexBox } from "lib/ui-ux"
import { Routes, Route, useNavigate } from "react-router-dom"
import { DashboardPage } from "modules/dashboard/pages"
import { TicketsPage } from "modules/tickets/pages"
import { CustomersPage } from "modules/customers/pages"
import { SettingsPage } from "modules/settings/pages"
import { ProtectedRoute } from "modules/login/protected-route"
import { Login, useAuth } from "modules/login"

const CoreLayoutPage = React.memo(() => {
    return (
        <>
            <Toolbar />
            <FlexBox $width="100%" $height="calc(100% - 65px)">
                <NavigationMenu />
                <div style={{ width: 'calc(100% - 64px)' }}>
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route
                                key="dashboard-route"
                                path="/dashboard"
                                element={<DashboardPage />} />
                            <Route
                                key="tickets"
                                path="/tickets/*"
                                element={<TicketsPage />} />
                            <Route
                                key="customers"
                                path="/customers"
                                element={<CustomersPage />} />
                            <Route
                                key="settings"
                                path="/settings"
                                element={<SettingsPage />} />
                        </Route>
                    </Routes>
                </div>
            </FlexBox>
        </>
    )
})

export const CoreLayoutBase = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true })
        }
        else {
            navigate('/dashboard', { replace: true })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Routes>
            <Route key="root" path="/*" element={<CoreLayoutPage />} />
            <Route key="login" path="/login" element={<Login />} />
        </Routes>
    )
}
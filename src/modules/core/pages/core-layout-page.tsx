import React from "react"
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { FlexBox } from "lib/ui-ux"
import { Routes, Route, Navigate } from "react-router-dom"
import { DashboardPage } from "modules/dashboard/pages"
import { TicketsPage } from "modules/tickets/pages"
import { CustomersPage } from "modules/customers/pages"
import { SettingsPage } from "modules/settings/pages"

export const CoreLayoutPage = React.memo(() => {
    return (
        <>
            <Toolbar />
            <FlexBox $width="100%" $height="calc(100% - 65px)">
                <NavigationMenu />
                <div style={{ width: 'calc(100% - 64px)' }}>
                    <Routes>
                        <Route key="root-route" path="/" element={<Navigate to="/dashboard" />} />
                        <Route key="dashboard-route" path="/dashboard" element={<DashboardPage />} />
                        <Route key="tickets" path="/tickets/*" element={<TicketsPage />} />
                        <Route key="customers" path="/customers" element={<CustomersPage />} />
                        <Route key="settings" path="/settings" element={<SettingsPage />} />
                    </Routes>
                </div>
            </FlexBox>
        </>
    )
})
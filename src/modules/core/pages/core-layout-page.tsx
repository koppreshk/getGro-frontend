import React, { Suspense, lazy } from "react"
import styled from "styled-components"
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux"
import { Routes, Route, useNavigate, useLocation, Outlet, Navigate } from "react-router-dom"
import { ProtectedRoute } from "modules/login/protected-route"
import { useAuth } from "modules/login"
import { commonStyles } from "lib/ui-ux/common-styles";
import { IncomingCallMain } from "modules/tickets/components/ticket-details/ticket-conversation/telephonic-conversations"
import LoginPage from '../../login/login';
import SetNewAgentPassword from '../../login/set-new-agent-password';
import { CustomerSurveyPage } from "modules/survey/pages"
import { useGetConfig } from "../apis/get-config"

const DashboardPage = lazy(() => import('../../dashboard/pages/dashboard-page'));
const TicketsPage = lazy(() => import('../../tickets/pages/tickets-page'));
const CustomersPage = lazy(() => import('../../customers/pages/customers-page'));
const ConfigurationsPage = lazy(() => import('../../settings/pages/settings-page'));
const UserProfilePage = lazy(() => import('../../user-profile/pages/user-profile-page'));
const PageNotFound = lazy(() => import('./page-not-found'));

const PageContainer = styled(FlexBox)`
    ${commonStyles.sleekScrollStyle};
`;

const HomePage = React.memo(() => {
    return (
        <>
            <Toolbar />
            <PageContainer width="100%" height="calc(100% - 53px)">
                <NavigationMenu />
                <div style={{ width: 'calc(100% - 64px)' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
                <IncomingCallMain />
            </PageContainer>
        </>
    )
})

export const CoreLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading } = useGetConfig(user ? true : false);

    React.useEffect(() => {
        if (user && location.pathname === '/login') {
            navigate('/dashboard', { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return <CenteredCircularProgress />
    }

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
                        path="customers/*"
                        element={<CustomersPage />} />
                    <Route
                        key="configurations"
                        path="configurations/*"
                        element={<ConfigurationsPage />} />
                    <Route
                        key="userProfile"
                        path="userProfile/"
                        element={<UserProfilePage />} />
                </Route>
            </Route>
            <Route key="login" path="/login" element={<LoginPage />} />
            <Route key="set-new-agent-password" path="/account/verify" element={<SetNewAgentPassword />} />
            <Route key="customer-feedback" path="customer-feedback/*" element={<CustomerSurveyPage />} />
            <Route key="not-found" path="*" element={<PageNotFound />} />
        </Routes>
    )
}

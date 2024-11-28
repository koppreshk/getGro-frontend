import React, { Suspense, lazy } from "react"
import { Routes, Route, useNavigate, useLocation, Outlet, Navigate } from "react-router-dom"
import styled from "styled-components"
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux"
import { ProtectedRoute } from "modules/login/protected-route"
import { useAuth } from "modules/login"
import { commonStyles } from "lib/ui-ux/common-styles";
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { useFetchUserConfig } from "../apis/fetch-user-config"
import { IncomingCallMain } from "modules/tickets/components/ticket-details/ticket-conversation/telephonic-conversations"
import LoginPage from '../../login/login';
import { ExternalPreviewForm } from "modules/settings/component/channel-configurations/web-forms/preview-form-external"

const CustomerSurveyPage = lazy(() => import('../../survey/pages/customer-survey'));
const SetNewAgentPassword = lazy(() => import('../../login/set-new-agent-password'));
const ResetPassword = lazy(() => import("../../login/reset-password"));
const DashboardPage = lazy(() => import('../../dashboard/pages/dashboard-page'));
const TicketsPage = lazy(() => import('../../tickets/pages/tickets-page'));
const KnowledgeBasePage = lazy(() => import('../../knowledge-base/pages/knowledge-base-page'));
const CustomersPage = lazy(() => import('../../customers/pages/customers-page'));
const ChatsPage = lazy(() => import('../../chats/pages/chat-layout-page'));
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
    const { isLoading } = useFetchUserConfig(user);

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
                        key="knowledge-base"
                        path="knowledge-base/*"
                        element={<KnowledgeBasePage />} />
                    <Route
                        key="customers"
                        path="customers/*"
                        element={<CustomersPage />} />
                    <Route
                        key="chats"
                        path="chat/*"
                        element={<ChatsPage />} />
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
            <Route
                key="set-new-agent-password"
                path="/account/verify"
                element={(
                    <Suspense fallback="Loading Page...">
                        <SetNewAgentPassword />
                    </Suspense>)} />
            <Route
                key="reset-password"
                path="/reset-password"
                element={(
                    <Suspense fallback="Loading Page...">
                        <ResetPassword />
                    </Suspense>
                )} />
            <Route
                key="customer-feedback"
                path="customer-feedback/*"
                element={(
                    <Suspense fallback="Loading Page...">
                        <CustomerSurveyPage />
                    </Suspense>
                )} />
            <Route
                key="webform"
                path="webform/*"
                element={(
                    <ExternalPreviewForm />
                )} />
            <Route key="login" path="/login" element={<LoginPage />} />
            <Route key="not-found" path="*" element={<PageNotFound />} />
        </Routes>
    )
}

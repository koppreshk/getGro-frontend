import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { Configurations } from "../component"
import { ProtectedConfigurationsRoute } from "modules/login/protected-route";
const TicketTagsContainer = lazy(() => import("../containers/ticket-tags/ticket-tags-container"))
const InstagramConfigurations = lazy(() => import("../component/channel-configurations/instagram-configurations"));
const EmailConfigLayout = lazy(() => import("../component/channel-configurations/email/email-config-layout"));
const AgentsLayout = lazy(() => import("../component/user-and-permissions/agents/agents-layout"))
const AgentAvailabilityLayout = lazy(() => import("../component/user-and-permissions/agent-availability/agent-avilability-layout"))
const SatisfactionSurveyLayout = lazy(() => import("../component/general/satifaction-survey/satisfaction-survey-layout"))
const MarketplaceRoutes = lazy(() => import("../component/apps/marketplace/marketplace-layout"))
const RolesAndPermissionsContainer = lazy(() => import("../containers/roles-and-permissions/roles-and-permission-container"))
const FetchAllAssignmentsContainer = lazy(() => import("../containers/ticket-automation/auto-assignments/fetch-all-assignments-container"))
const FetchAllCreateTicketTriggersContainer = lazy(() => import("../containers/ticket-automation/create-ticket-triggers/fetch-all-create-ticket-triggers-container"))
const TemplatesContainer = lazy(() => import("../containers/templates/templates-container"))
const AllEscalationsContainer = lazy(() => import('../containers/ticket-automation/ticket-sla/all-escalations-container'))
const TicketStatusContainer = lazy(() => import("../containers/ticket-status/ticket-status-container"));
const TicketQueuesContainer = lazy(() => import("../containers/ticket-queues/ticket-queues-container"));
const AuditLogsContainer = lazy(() => import("../containers/audit-logs/audit-logs-container"));

export default function ConfigurationsPage() {
    return (
        <Suspense fallback={<div>Loading Configurations Page...</div>}>
            <Routes>
                <Route element={<ProtectedConfigurationsRoute />}>
                    <Route key="configuration-home" path='/'  >
                        <Route key="homepath" path="/" element={<Configurations />} />
                        <Route key="templates" path="templates/*" element={<TemplatesContainer />} />
                        <Route key="ticket-status" path="ticket-status/*" element={<TicketStatusContainer />} />
                        <Route key="ticket-tags" path="tags" element={<TicketTagsContainer />} />
                        <Route key="instagram-login" path="instagram" element={<InstagramConfigurations />} />
                        <Route key="email-config" path="email/*" element={<EmailConfigLayout />} />

                        <Route key="ticket-escalation" path="ticket-escalation/*" element={<AllEscalationsContainer />} />
                        <Route key="auto-assignment" path="auto-assignments/*" element={<FetchAllAssignmentsContainer />} />
                        <Route key="create-ticket-triggers" path="create-ticket-triggers/*" element={<FetchAllCreateTicketTriggersContainer autoMationType="create_trigger" />} />
                        <Route key="update-ticket-triggers" path="update-ticket-triggers/*" element={<FetchAllCreateTicketTriggersContainer autoMationType="update_trigger" />} />

                        <Route key="add-agent" path="agents" element={<AgentsLayout />} />
                        <Route key="queues" path="queues/*" element={<TicketQueuesContainer />} />
                        <Route key="roles-and-permissions" path="roles-and-permissions/*" element={<RolesAndPermissionsContainer />} />
                        <Route key="agent-availability" path="agent-availability" element={<AgentAvailabilityLayout />} />

                        <Route key="satisfaction-survey" path="satisfaction-survey" element={<SatisfactionSurveyLayout />} />
                        <Route key="audit-logs" path="audit-logs" element={<AuditLogsContainer />} />

                        <Route key="marketplace" path="marketplace/*" element={<MarketplaceRoutes />} />

                    </Route>
                </Route>
            </Routes>
        </Suspense >
    )
}

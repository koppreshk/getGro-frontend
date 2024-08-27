import { Route, Routes } from "react-router-dom"
import { Configurations } from "../component"
import { TicketQueuesContainer, AllEscalationsContainer, TicketTagsContainer } from "../containers"
import { EmailConfigLayout, FacebookConfigurations } from "../component/channel-configurations"
import { AgentsLayout } from "../component/user-and-permissions/agents/agents-layout"
import { AgentAvailabilityLayout } from "../component/user-and-permissions/agent-availability/agent-avilability-layout"
import { SatisfactionSurveyLayout } from "../component/general/satifaction-survey/satisfaction-survey-layout"
import { MarketplaceRoutes } from "../component/apps/marketplace/marketplace-layout"
import { TicketStatusContainer } from "../containers/ticket-status"
import { AutoAssignmentsLayout } from "../component/ticket-automation"
import { UpdateTicketTriggersLayout } from "../component/ticket-automation/update-ticket-triggers"
import { CreateTicketTriggersLayout } from "../component/ticket-automation/create-ticket-triggers"
import { RolesAndPermissionsContainer } from "../containers/roles-and-permissions"

export default function ConfigurationsPage() {
    return (
        <Routes>
            <Route key="configuration-home" path='/' element={<Configurations />} />
            <Route key="queues" path="/queues" element={<TicketQueuesContainer />} />
            <Route key="ticket-escalation" path="/ticket-escalation/*" element={<AllEscalationsContainer />} />
            <Route key="ticket-status" path="/ticket-status/*" element={<TicketStatusContainer />} />
            <Route key="ticket-tags" path="/tags" element={<TicketTagsContainer />} />
            <Route key="facebook-login" path="/facebook" element={<FacebookConfigurations />} />
            <Route key="email-config" path="/email/*" element={<EmailConfigLayout />} />
            <Route key="add-agent" path="/agents" element={<AgentsLayout />} />

            <Route key="auto-assignment" path="/auto-assignments/*" element={<AutoAssignmentsLayout />} />
            <Route key="create-ticket-triggers" path="/create-ticket-triggers/*" element={<CreateTicketTriggersLayout />} />
            <Route key="update-ticket-triggers" path="/update-ticket-triggers/*" element={<UpdateTicketTriggersLayout />} />

            <Route key="agent-availability" path="/agent-availability" element={<AgentAvailabilityLayout />} />
            <Route key="satisfaction-survey" path="/satisfaction-survey" element={<SatisfactionSurveyLayout />} />
            <Route key="marketplace" path="/marketplace/*" element={<MarketplaceRoutes />} />

            <Route key="roles-and-permissions" path="/roles-and-permissions/*" element={<RolesAndPermissionsContainer />} />
        </Routes>
    )
}


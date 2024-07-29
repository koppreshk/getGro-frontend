import { Route, Routes } from "react-router-dom"
import { Configurations } from "../component"
import { TicketQueuesContainer, AllEscalationsContainer, FetchAllTagsContainer } from "../containers"
import { EmailConfigLayout, FacebookConfigurations } from "../component/channel-configurations"
import { UsersLayout } from "../component/general"
import { AgentAvailabilityLayout } from "../component/general/agent-availability/agent-avilability-layout"
import { SatisfactionSurveyLayout } from "../component/general/satifaction-survey/satisfaction-survey-layout"
import { MarketplaceRoutes } from "../component/apps/marketplace/marketplace-layout"
import { TicketStatusContainer } from "../containers/ticket-status"
import { AutoAssignmentsLayout } from "../component/ticket-automation"
import { UpdateTicketTriggersLayout } from "../component/ticket-automation/update-ticket-triggers"

export default function ConfigurationsPage() {
    return (
        <Routes>
            <Route key="configuration-home" path='/' element={<Configurations />} />
            <Route key="ticket-queue" path="/ticket-queue" element={<TicketQueuesContainer />} />
            <Route key="ticket-escalation" path="/ticket-escalation/*" element={<AllEscalationsContainer />} />
            <Route key="ticket-status" path="/ticket-status/*" element={<TicketStatusContainer />} />
            <Route key="ticket-tags" path="/tags" element={<FetchAllTagsContainer />} />
            <Route key="facebook-login" path="/facebook" element={<FacebookConfigurations />} />
            <Route key="email-config" path="/email/*" element={<EmailConfigLayout />} />
            <Route key="add-user" path="/users" element={<UsersLayout />} />

            <Route key="auto-assignment" path="/auto-assignments/*" element={<AutoAssignmentsLayout />} />
            <Route key="create-triggers" path="/create-triggers*" element={<AutoAssignmentsLayout />} />
            <Route key="update-ticket-triggers" path="/update-ticket-triggers/*" element={<UpdateTicketTriggersLayout />} />

            <Route key="agent-availability" path="/agent-availability" element={<AgentAvailabilityLayout />} />
            <Route key="satisfaction-survey" path="/satisfaction-survey" element={<SatisfactionSurveyLayout />} />
            <Route key="marketplace" path="/marketplace/*" element={<MarketplaceRoutes />} />
        </Routes>
    )
}


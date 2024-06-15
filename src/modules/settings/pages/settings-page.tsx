import { Route, Routes } from "react-router-dom"
import { Configurations } from "../component"
import { TicketQueuesContainer, TicketEscalationContainer, TicketDispositionTypeContainer, FetchAllTagsContainer } from "../containers"
import { FacebookConfigurations } from "../component/channel-configurations"
import { UsersLayout } from "../component/general"
import { AgentAvailabilityLayout } from "../component/general/agent-availability/agent-avilability-layout"
import { SatisfactionSurveyLayout } from "../component/general/satifaction-survey/satisfaction-survey-layout"
import { MarketplaceRoutes } from "../component/apps/marketplace/marketplace-layout"

export default function ConfigurationsPage() {
    return (
        <Routes>
            <Route key="configuration-home" path='/' element={<Configurations />} />
            <Route key="ticket-queue" path="/ticket-queue" element={<TicketQueuesContainer />} />
            <Route key="ticket-escalation" path="/ticket-escalation/*" element={<TicketEscalationContainer />} />
            <Route key="ticket-disposition-type" path="/disposition-type" element={<TicketDispositionTypeContainer />} />
            <Route key="ticket-tags" path="/tags" element={<FetchAllTagsContainer />} />
            <Route key="facebook-login" path="/facebook" element={<FacebookConfigurations />} />
            <Route key="add-user" path="/users" element={<UsersLayout />} />
            <Route key="agent-availability" path="/agent-availability" element={<AgentAvailabilityLayout />} />
            <Route key="satisfaction-survey" path="/satisfaction-survey" element={<SatisfactionSurveyLayout />} />
            <Route key="marketplace" path="/marketplace/*" element={<MarketplaceRoutes />} />
        </Routes>
    )
}


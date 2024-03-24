import { Route, Routes } from "react-router-dom"
import { Configurations } from "../component"
import { TicketQueuesContainer, TicketEscalationContainer, TicketDispositionTypeContainer } from "../containers"
import { TagsChannelLayout } from "../component/ticket-configurations/ticket-tags/tags-channel-layout"

export default function ConfigurationsPage() {
    return (
        <Routes>
            <Route key="configuration-home" path='/' element={<Configurations />} />
            <Route key="ticket-queue" path="/ticket-queue" element={<TicketQueuesContainer />} />
            <Route key="ticket-escalation" path="/ticket-escalation" element={<TicketEscalationContainer />} />
            <Route key="ticket-disposition-type" path="/disposition-type" element={<TicketDispositionTypeContainer />} />
            <Route key="ticket-tags" path="/tags" element={<TagsChannelLayout />} />
        </Routes>
    )
}


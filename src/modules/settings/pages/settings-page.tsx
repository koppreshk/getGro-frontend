import { Route, Routes } from "react-router-dom"
import { Configurations } from "../component"
import { TicketQueuesContainer, TicketEscalationContainer, TicketDispositionTypeContainer } from "../containers"

export default function ConfigurationsPage() {
    return (
        <Routes>
            <Route key="configuration-home" path='/' element={<Configurations />} />
            <Route key="ticket-queue" path="/ticket-queue" element={<TicketQueuesContainer />} />
            <Route key="ticket-escalation" path="/ticket-escalation" element={<TicketEscalationContainer />} />
            <Route key="ticket-disposition-type" path="/disposition-type" element={<TicketDispositionTypeContainer />} />
        </Routes>
    )
}


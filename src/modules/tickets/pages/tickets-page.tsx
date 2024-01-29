import { FlexBox } from "lib/ui-ux"
import { TicketViews } from "../components"
import { Navigate, Route, Routes, useMatch } from "react-router-dom"
import { AllCompletedTicketsContainer, CreatedByMeTicketsContainer, UnassignedTicketsContainer, AllPendingTicketsContainer } from "../containers"
import { TicketDetailsLayout } from "../components/ticket-details"
import { useAuth } from "modules/login";
import { AllTicketsContainer } from "../containers/all-tickets-container"

export default function TicketsPage() {
    const match = useMatch('/tickets/:type/:ticketId');
    const { user } = useAuth();
    return (
        <>
            <FlexBox height="100%">
                {match?.params?.ticketId ? null : <TicketViews />}
                <div style={{ width: match?.params?.ticketId ? '100%' : 'calc(100% - 200px)' }}>
                    <Routes>
                        <Route key="default-view" path="*" element={<Navigate to={user?.role === "Admin" ? "/tickets/unassigned" : "/tickets/assigned-to-me"} />} />
                        <Route key="all" path="/all" element={<AllTicketsContainer />} />
                        <Route key="unassigned" path="/unassigned" element={<UnassignedTicketsContainer />} />
                        <Route key="all-pending" path="/all-pending" element={<AllPendingTicketsContainer />} />
                        <Route key="all-complete" path="/all-complete" element={<AllCompletedTicketsContainer />} />
                        <Route key="all-junk" path="/all-junk" element={<UnassignedTicketsContainer />} />
                        <Route key="assigned-to-me" path="/assigned-to-me" element={<UnassignedTicketsContainer />} />
                        <Route key="created-by-me" path="/created-by-me" element={<CreatedByMeTicketsContainer />} />
                        <Route key="completed-by-me" path="/completed-by-me" element={<UnassignedTicketsContainer />} />
                        <Route key="completed-by-team" path="/completed-by-team" element={<UnassignedTicketsContainer />} />
                        <Route key="pending-by-team" path="/pending-by-team" element={<UnassignedTicketsContainer />} />
                        
                        <Route key="all" path="/all/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="unassigned-details" path="/unassigned/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-pending-details" path="/all-pending/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-complete-details" path="/all-complete/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="assigned-to-me-details" path="/assigned-to-me/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="created-by-me-details" path="/created-by-me/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="completed-by-me-details" path="/completed-by-me/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="completed-by-team-details" path="/completed-by-team/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="pending-by-team-details" path="/pending-by-team/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-junk-details" path="/all-junk/:ticketId" element={<TicketDetailsLayout />} />
                    </Routes>
                </div>
            </FlexBox>
        </>
    )
}

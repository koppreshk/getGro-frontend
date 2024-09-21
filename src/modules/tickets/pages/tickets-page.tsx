import { FlexBox } from "lib/ui-ux"
import { TicketViews } from "../components"
import { Navigate, Route, Routes, useMatch } from "react-router-dom"
import {
    AllResolvedTicketsContainer, MyResolvedTicketsContainer,
    AllPendingTicketsContainer, MyPendingTicketsContainer,
    AllClosedTicketsContainer, MyClosedTicketsContainer, AllTicketsContainer
} from "../containers"
import { TicketDetailsLayout } from "../components/ticket-details"
import { useAuth } from "modules/login";

export default function TicketsPage() {
    const match = useMatch('/tickets/:type/:ticketId');
    const { user } = useAuth();

    return (
        <>
            <FlexBox height="100%">
                {match?.params?.ticketId ? null : <TicketViews />}
                <div style={{ width: match?.params?.ticketId ? '100%' : 'calc(100% - 200px)' }}>
                    <Routes>
                        <Route key="default-view" path="*" element={<Navigate to={user?.role === "Account Owner" ? "/tickets/all-tickets" : "/tickets/my-pending"} />} />
                        <Route key="all" path="/all-tickets" element={<AllTicketsContainer />} />
                        <Route key="all-pending" path="/all-pending" element={<AllPendingTicketsContainer />} />
                        <Route key="all-resolved" path="/all-resolved" element={<AllResolvedTicketsContainer />} />
                        <Route key="all-closed" path="/all-closed" element={<AllClosedTicketsContainer />} />
                        <Route key="my-pending" path="/my-pending" element={<MyPendingTicketsContainer />} />
                        <Route key="my-resolved" path="/my-resolved" element={<MyResolvedTicketsContainer />} />
                        <Route key="my-closed" path="/my-closed" element={<MyClosedTicketsContainer />} />

                        <Route key="all" path="/all-tickets/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-pending-details" path="/all-pending/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-resolved-details" path="/all-resolved/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-closed-details" path="/all-closed/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="my-pending-details" path="/my-pending/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="my-resolved-details" path="/my-resolved/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="my-closed-details" path="/my-closed/:ticketId" element={<TicketDetailsLayout />} />
                    </Routes>
                </div>
            </FlexBox>
        </>
    )
}

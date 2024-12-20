import { useAppSelector } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { Navigate, Route, Routes, useMatch } from 'react-router-dom';

import { TicketViews } from '../components';
import { TicketDetailsLayout } from '../components/ticket-details';
import {
  AllResolvedTicketsContainer,
  MyResolvedTicketsContainer,
  AllPendingTicketsContainer,
  MyPendingTicketsContainer,
  AllClosedTicketsContainer,
  MyClosedTicketsContainer,
  AllTicketsContainer,
} from '../containers';

export default function TicketsPage() {
  const match = useMatch('/tickets/:type/:ticketId');
  const defaultTicketView = useAppSelector(
    (core) => core?.core.config?.default_ticket_view
  );

  return (
    <>
      <FlexBox height="100%">
        {match?.params?.ticketId ? null : <TicketViews />}
        <div
          style={{
            width: match?.params?.ticketId ? '100%' : 'calc(100% - 200px)',
          }}
        >
          <Routes>
            <Route
              key="default-view"
              path="*"
              element={
                <Navigate
                  to={
                    defaultTicketView
                      ? `/tickets/${defaultTicketView}`
                      : '/tickets/all_tickets'
                  }
                />
              }
            />
            <Route
              key="all"
              path="/all_tickets"
              element={<AllTicketsContainer />}
            />
            <Route
              key="all-pending"
              path="/all_pending"
              element={<AllPendingTicketsContainer />}
            />
            <Route
              key="all-resolved"
              path="/all_resolved"
              element={<AllResolvedTicketsContainer />}
            />
            <Route
              key="all-closed"
              path="/all_closed"
              element={<AllClosedTicketsContainer />}
            />
            <Route
              key="my-pending"
              path="/my_pending"
              element={<MyPendingTicketsContainer />}
            />
            <Route
              key="my-resolved"
              path="/my_resolved"
              element={<MyResolvedTicketsContainer />}
            />
            <Route
              key="my-closed"
              path="/my_closed"
              element={<MyClosedTicketsContainer />}
            />

            <Route
              key="all"
              path="/all_tickets/:ticketId"
              element={<TicketDetailsLayout />}
            />
            <Route
              key="all-pending-details"
              path="/all_pending/:ticketId"
              element={<TicketDetailsLayout />}
            />
            <Route
              key="all-resolved-details"
              path="/all_resolved/:ticketId"
              element={<TicketDetailsLayout />}
            />
            <Route
              key="all-closed-details"
              path="/all_closed/:ticketId"
              element={<TicketDetailsLayout />}
            />
            <Route
              key="my-pending-details"
              path="/my_pending/:ticketId"
              element={<TicketDetailsLayout />}
            />
            <Route
              key="my-resolved-details"
              path="/my_resolved/:ticketId"
              element={<TicketDetailsLayout />}
            />
            <Route
              key="my-closed-details"
              path="/my_closed/:ticketId"
              element={<TicketDetailsLayout />}
            />
          </Routes>
        </div>
      </FlexBox>
    </>
  );
}

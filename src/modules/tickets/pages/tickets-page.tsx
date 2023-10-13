import React from "react"
import styled from "styled-components"
import { DataGrid, FlexBox, columns, defaultData } from "lib/ui-ux"
import { TicketViews } from "../components"
import { Navigate, Route, Routes, useMatch } from "react-router-dom"
import { UnassignedTicketsContainer } from "../containers"
import { TicketDetailsLayout } from "../components/ticket-details"
import { commonStyles } from "lib/ui-ux/common-styles"

const Container = styled(FlexBox)`
    ${commonStyles.sleekScrollStyle};
`;

export const TicketsPage = React.memo(() => {
    const match = useMatch('/tickets/:type/:ticketId');

    return (
        <>
            <Container $height="100%">
                {match?.params?.ticketId ? null : <TicketViews />}
                <div style={{ width: match?.params?.ticketId ? '100%' : 'calc(100% - 200px)' }}>
                    <Routes>
                        <Route key="default-view" path="*" element={<Navigate to="/tickets/unassigned" />} />
                        <Route key="unassigned" path="/unassigned" element={<UnassignedTicketsContainer />} />
                        <Route key="unassigned-details" path="/unassigned/:ticketId" element={<TicketDetailsLayout />} />
                        <Route key="all-pending" path="/all-pending" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="all-complete" path="/all-complete" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="all-junk" path="/all-junk" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="assigned-to-me" path="/assigned-to-me" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="created-by-me" path="/created-by-me" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="completed-by-me" path="/completed-by-me" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="completed-by-team" path="/completed-by-team" element={<DataGrid columns={columns} data={defaultData} />} />
                        <Route key="pending-by-team" path="/pending-by-team" element={<DataGrid columns={columns} data={defaultData} />} />
                    </Routes>
                </div>
            </Container>
        </>
    )
})

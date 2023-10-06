import React from "react"
import { DataGrid, FlexBox, columns, defaultData } from "lib/ui-ux"
import { TabularLayout, TicketViews } from "../components"
import { Navigate, Route, Routes } from "react-router-dom"

export const TicketsPage = React.memo(() => {
    return (
        <FlexBox $height="100%">
            <TicketViews />
            <div style={{ width: 'calc(100% - 200px)' }}>
                <Routes>
                    <Route key="default-view" path="*" element={<Navigate to="/tickets/unassigned" />} />
                    <Route key="unassigned" path="/unassigned" element={<TabularLayout />} />
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
        </FlexBox>
    )
})
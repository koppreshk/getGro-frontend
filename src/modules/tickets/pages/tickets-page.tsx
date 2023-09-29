import { DataGrid, columns, defaultData } from "lib/ui-ux"
import React from "react"

export const TicketsPage = React.memo(() => {
    return (
        <DataGrid columns={columns} data={defaultData} />
    )
})
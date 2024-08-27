import { createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "lib/ui-ux"
import { getFormattedDate } from "lib/utils";
import { TicketsHistory } from "modules/tickets/apis";

const useColumns = () => {
    const columnHelper = createColumnHelper<TicketsHistory>();

    const columns = [
        columnHelper.accessor("activityType", {
            id: 'activityType',
            cell: info => info.getValue(),
            header: () => 'Activity Type',
        }),
        columnHelper.accessor("createdAt", {
            id: 'createdAt',
            cell: info => getFormattedDate(info.getValue()),
            header: () => 'Created At',
        }),
        columnHelper.accessor("oldValue", {
            id: 'oldValue',
            cell: info => info.getValue() ?? '-',
            header: () => 'Old Value',
        }),
        columnHelper.accessor("newValue", {
            id: 'newValue',
            cell: info => info.getValue() ?? '-',
            header: () => 'New Value',
        })
    ]

    return columns;
}

export const TicketHistory = (props: { data: TicketsHistory[] }) => {
    const { data } = props;
    const columns = useColumns();

    return (
        <>
            <DataGrid columns={columns} data={data} />
        </>
    )
}
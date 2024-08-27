import { createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "lib/ui-ux"
import { getFormattedDate } from "lib/utils";
import { TicketsHistory } from "modules/tickets/apis";

const useColumns = () => {
    const columnHelper = createColumnHelper<TicketsHistory>();

    const columns = [
        columnHelper.accessor("description", {
            id: 'description',
            cell: info => info.getValue(),
            header: () => 'Description',
            meta: {
                disableColReorder: true
            }
        }),
        columnHelper.accessor("createdAt", {
            id: 'createdAt',
            cell: info => getFormattedDate(info.getValue(), { dateStyle: 'short', timeStyle: 'short' }),
            header: () => 'Created At',
            enableResizing: false,
            meta: {
                disableColReorder: true
            }
        }),
        columnHelper.accessor("oldValue", {
            id: 'oldValue',
            cell: info => info.getValue() ?? '-',
            header: () => 'Old Value',
            enableResizing: false,
            meta: {
                disableColReorder: true
            }
        }),
        columnHelper.accessor("newValue", {
            id: 'newValue',
            cell: info => info.getValue() ?? '-',
            header: () => 'New Value',
            enableResizing: false,
            meta: {
                disableColReorder: true
            }
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
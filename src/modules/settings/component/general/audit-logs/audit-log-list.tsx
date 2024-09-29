import { createColumnHelper } from "@tanstack/react-table";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { AuditLog } from "modules/settings/apis/audit-logs/fetch-all-audit-logs";


interface IAuditLogListProps {
    data: AuditLog[];
    isLoading: boolean;
    totalPages: number;
}

export const AuditLogList = (props: IAuditLogListProps) => {
    const { data, isLoading, totalPages } = props;
    const colums = useColumns();

    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <ConfigDataGrid
                columns={colums}
                isLoading={isLoading}
                data={data}
                totalPages={totalPages}
                enableSerchField
            />
        </div>
    )
}

function useColumns() {
    const columnHelper = createColumnHelper<AuditLog>();
    const columns = [
        columnHelper.accessor("user", {
            id: 'user',
            header: () => 'User Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => 'Created Date',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('event_type', {
            id: 'event_type',
            header: () => 'Event Type',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('summary', {
            id: 'summary',
            header: () => 'Summary',
            cell: info => info.getValue(),
            minSize: 300
        })
    ]

    return columns;
}

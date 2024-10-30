import { createColumnHelper } from "@tanstack/react-table";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { AuditLog } from "modules/settings/apis/audit-logs/fetch-all-audit-logs";
import { useTranslation } from "react-i18next";


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
    const { t } = useTranslation();
    const columns = [
        columnHelper.accessor("user", {
            id: 'user',
            header: () => t('user_name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => t('created_at'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('event_type', {
            id: 'event_type',
            header: () => t('event_type'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('summary', {
            id: 'summary',
            header: () => t('summary'),
            cell: info => info.getValue(),
            minSize: 300
        })
    ]

    return columns;
}

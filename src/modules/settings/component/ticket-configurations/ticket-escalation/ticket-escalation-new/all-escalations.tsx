import { useAppSelector } from 'lib/hooks';
import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { FlexBox } from 'lib/ui-ux';
import { ITicketEscalaltionLayoutProps } from '../ticket-escalation-layout';
import { IEscalationsNew } from 'modules/settings/apis/escalations';
import { DeleteEscalation } from '../delete-escalation';
import { SLAStatus } from './sla-status';
import { EditEscalation } from './edit-escalation';

interface IAllEscalaltionsProps extends ITicketEscalaltionLayoutProps {

}

const useColumns = () => {
    const columnHelper = createColumnHelper<IEscalationsNew>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'slaName',
            cell: info => info.getValue(),
            header: () => 'SLA Name',
        }),
        columnHelper.accessor("last_modified_by", {
            id: 'lastModifiedBy',
            cell: info => info.getValue(),
            header: () => 'Last Modified By',
        }),
        columnHelper.accessor("last_modified_at", {
            id: 'lastModified',
            cell: info => info.getValue(),
            header: () => 'Last Modified',
        }),
        columnHelper.display({
            id: 'isSLAActive',
            header: () => 'SLA Active',
            cell: ({ row: { original } }) => {
                return (
                    <SLAStatus status={original.is_active} id={original.id} />
                )
            },
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditEscalation id={original.id} />
                        <DeleteEscalation id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}


export const AllEscalations = (props: IAllEscalaltionsProps) => {
    const { allEscalations, isLoading } = props;
    const columns = useColumns();
    const configTotalPages = useAppSelector((state) => state.configurations.totalPages);

    return (
        <>
            <ConfigDataGrid
                columns={columns}
                isLoading={isLoading}
                data={allEscalations!}
                totalPages={configTotalPages}
                enableSerchField />
        </>
    );
}

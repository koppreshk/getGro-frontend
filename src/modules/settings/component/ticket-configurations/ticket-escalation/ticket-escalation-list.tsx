import { createColumnHelper } from '@tanstack/react-table';
import { ITicketEscalaltionLayoutProps } from './ticket-escalation-layout';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { EscalationConditions } from 'modules/settings/apis/escalations';
import { FlexBox } from 'lib/ui-ux';
import EditEscalation from './edit-escalation';

interface ITicketEscalationListProps extends ITicketEscalaltionLayoutProps {

}

const useColumns = () => {
    const columnHelper = createColumnHelper<EscalationConditions>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            cell: info => info.getValue(),
            header: () => 'Name',
        }),
        columnHelper.accessor("condition", {
            id: 'condition',
            cell: info => info.getValue(),
            header: () => 'Condition',
        }),
        columnHelper.accessor("after", {
            id: 'after',
            cell: info => info.getValue(),
            header: () => 'After',
        }),
        columnHelper.accessor("alert_time", {
            id: 'alert_time',
            cell: info => `${info.getValue()} min`,
            header: () => 'Alert Time',
        }),
        columnHelper.accessor("status", {
            id: 'status',
            cell: info => info.getValue(),
            header: () => 'Status',
        }),
        columnHelper.accessor("sub_status", {
            id: 'sub_status',
            cell: info => info.getValue(),
            header: () => 'Sub Status',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditEscalation escalaltionMetadata={original} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

function TicketEscalationList(props: ITicketEscalationListProps) {
    const columns = useColumns();
    const { escalationConditions, isLoading } = props;
    return (
        <ConfigDataGrid columns={columns} isLoading={isLoading} data={escalationConditions} />
    );
}

export default TicketEscalationList;
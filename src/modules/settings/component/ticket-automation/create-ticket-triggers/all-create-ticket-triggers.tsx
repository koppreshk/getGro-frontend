import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { FlexBox } from 'lib/ui-ux';
import { IAllAssignments } from 'modules/settings/apis/ticket-automation';
import { EditTicketTriggers } from './edit-create-ticket-triggers';
import { DeleteTicketTriggers } from './delete-create-ticket-trigger';
import { AssignmentStatus } from '../auto-assignments/assignment-status';

interface IAllEmailProps {
    data?: IAllAssignments[];
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IAllAssignments>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'Rule Name',
            cell: info => info.getValue(),
            header: () => 'Rule Name',
        }),
        columnHelper.accessor("last_modified", {
            id: 'last_modified',
            cell: info => info.getValue(),
            header: () => 'Last Modified',
        }),
        columnHelper.accessor("last_modified_by", {
            id: 'last_modified_by',
            cell: info => info.getValue(),
            header: () => 'Last Modified By',
        }),
        columnHelper.accessor('is_active', {
            id: 'is_active',
            header: () => 'is Active',
            cell: ({ row: { original } }) => < AssignmentStatus id={original.id} status={original.is_active} />,
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditTicketTriggers id={original.id} />
                        <DeleteTicketTriggers id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}


export const AllCreateTicketTriggers = (props: IAllEmailProps) => {
    const { data, isLoading } = props;
    const columns = useColumns();

    return (
        <>
            <ConfigDataGrid
                columns={columns}
                hideTableControls
                isLoading={isLoading}
                data={data!} />
        </>
    );
}

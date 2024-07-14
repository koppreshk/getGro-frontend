import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { FlexBox } from 'lib/ui-ux';
import { EditEmail } from './edit-email';
import { DeleteEmail } from './delete-email';
import { IEmails } from 'modules/settings/apis';

interface IAllEmailProps {
    data?: IEmails[];
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IEmails>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'slaName',
            cell: info => info.getValue(),
            header: () => 'Name',
        }),
        columnHelper.accessor("updated_on", {
            id: 'updated_on',
            cell: info => info.getValue(),
            header: () => 'Updated On',
        }),
        columnHelper.accessor("email", {
            id: 'email',
            cell: info => info.getValue(),
            header: () => 'Email',
        }),
        columnHelper.display({
            id: 'isActive',
            header: () => 'is Active',
            cell: info => info.getValue(),
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditEmail id={original.id} />
                        <DeleteEmail id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}


export const AllEmails = (props: IAllEmailProps) => {
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

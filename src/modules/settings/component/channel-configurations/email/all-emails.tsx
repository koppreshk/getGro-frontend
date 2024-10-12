import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { FlexBox } from 'lib/ui-ux';
import { EditEmail } from './edit-email';
import { DeleteEmail } from './delete-email';
import { IEmails } from 'modules/settings/apis';
import { getFormattedDate } from 'lib/utils';
import { useTranslation } from 'react-i18next';

interface IAllEmailProps {
    data?: IEmails[];
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IEmails>();
    const { t } = useTranslation();
    const columns = [
        columnHelper.accessor("display_name", {
            id: 'display_name',
            cell: info => info.getValue(),
            header: () => t('name'),
        }),
        columnHelper.accessor("updated_at", {
            id: 'updated_at',
            cell: info => getFormattedDate(info.getValue()),
            header: () => t('updated_at'),
        }),
        columnHelper.accessor("email", {
            id: 'email',
            cell: info => info.getValue(),
            header: () => t('email'),
        }),
        columnHelper.accessor('can_create_ticket', {
            id: 'can_create_ticket',
            header: () => t('is_active'),
            cell: info => info.getValue() ? 'Enabled' : 'Disabled',
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('actions'),
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

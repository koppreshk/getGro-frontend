import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { FlexBox } from 'lib/ui-ux';
import { IAllAssignments } from 'modules/settings/apis/ticket-automation';
import { EditAssignment } from './edit-assignment';
import { DeleteAssignment } from './delete-assignment';
import { AssignmentStatus } from './assignment-status';
import { useTranslation } from 'react-i18next';

interface IAllEmailProps {
    data?: IAllAssignments[];
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IAllAssignments>();
    const { t } = useTranslation();
    const columns = [
        columnHelper.accessor("name", {
            id: 'Rule Name',
            cell: info => info.getValue(),
            header: () => t('rule_name'),
        }),
        columnHelper.accessor("last_modified", {
            id: 'last_modified',
            cell: info => info.getValue(),
            header: () => t('last_modified'),
        }),
        columnHelper.accessor("last_modified_by", {
            id: 'last_modified_by',
            cell: info => info.getValue(),
            header: () => t('last_modified_by'),
        }),
        columnHelper.accessor('is_active', {
            id: 'is_active',
            header: () => t('is_active'),
            cell: ({ row: { original } }) => < AssignmentStatus id={original.id} status={original.is_active} autoMationType='auto_assignment' />,
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t("actions"),
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditAssignment id={original.id} />
                        <DeleteAssignment id={original.id} autoMationType='auto_assignment' />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}


export const AllAssignments = (props: IAllEmailProps) => {
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

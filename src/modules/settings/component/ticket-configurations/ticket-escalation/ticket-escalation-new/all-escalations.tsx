import { useAppSelector } from 'lib/hooks';
import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { Edit } from '@mui/icons-material';
import { Switch } from '@mui/material';
import { ITicketEscalaltionLayoutProps } from '../ticket-escalation-layout';
import { IEscalationsNew } from 'modules/settings/apis/escalations';
import { DeleteEscalation } from '../delete-escalation';
import { useNavigate } from 'react-router-dom';

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
            header: () => <span>SLA Active</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <Switch defaultChecked={original.is_active} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
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

const EditEscalation = (props: { id: number }) => {
    const navigate = useNavigate();

    const onEditClick = () => {
        navigate(`edit-escalation?id=${props.id}`)
    }

    return (
        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Escalation", arrow: true }} onClick={onEditClick} />
    )
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

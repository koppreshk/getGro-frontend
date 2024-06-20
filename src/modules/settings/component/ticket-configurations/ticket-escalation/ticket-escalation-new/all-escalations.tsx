import { useAppSelector } from 'lib/hooks';
import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { Delete, Edit } from '@mui/icons-material';
import { Switch } from '@mui/material';


interface IAllEscalaltionsProps {

}

interface IEscalationConditions {
    slaName: string;
    lastModifiedBy: string;
    lastModified: string;
    isSLAActive: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IEscalationConditions>();

    const columns = [
        columnHelper.accessor("slaName", {
            id: 'slaName',
            cell: info => info.getValue(),
            header: () => 'SLA Name',
        }),
        columnHelper.accessor("lastModifiedBy", {
            id: 'lastModifiedBy',
            cell: info => info.getValue(),
            header: () => 'Last Modified By',
        }),
        columnHelper.accessor("lastModified", {
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
                        <Switch defaultChecked={original.isSLAActive} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: () => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Escalation", arrow: true }} />
                        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: "Edit Escalation", arrow: true }} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

export const AllEscalations = (_props: IAllEscalaltionsProps) => {
    const columns = useColumns();

    const configTotalPages = useAppSelector((state) => state.configurations.totalPages);
    const data = [{ isSLAActive: true, lastModified: '20/06/2024', lastModifiedBy: 'Koppresh', slaName: 'Test' },
    { isSLAActive: true, lastModified: '19/06/2024', lastModifiedBy: 'Sanjay', slaName: 'Default' }] as IEscalationConditions[];
    return (
        <>
            <ConfigDataGrid
                columns={columns}
                isLoading={false}
                data={data}
                totalPages={configTotalPages}
                enableSerchField />
        </>
    );
}

import { useCallback, useState } from 'react';
import { useAppSelector } from 'lib/hooks';
import { Row, createColumnHelper } from '@tanstack/react-table';
// import { ITicketEscalaltionLayoutProps } from './ticket-escalation-layout';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { EscalationConditions } from 'modules/settings/apis/escalations';
import { CustomIconButton, DrawerExtended, FlexBox } from 'lib/ui-ux';
import { EditEscalationContainer } from 'modules/settings/containers';
import { Edit } from '@mui/icons-material';


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
            cell: () => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Escalation", arrow: true }} />
                        {/* <DeleteEscalation id={original.id} /> */}
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

function TicketEscalationList(props: any) {
    const columns = useColumns();
    const { escalationConditions, isLoading } = props;
    const [openAddEscalationDrawer, setOpenAddEscalationDrawer] = useState(false);
    const [escalationMetaData, setEscalationMetaData] = useState({});

    const configTotalPages = useAppSelector((state) => state.configurations.totalPages);

    const toggleAddEscalationDrawer = useCallback(() => {
        setOpenAddEscalationDrawer((prevValue) => !prevValue)
    }, []);

    const onRowClick = (row: Row<EscalationConditions>) => {
        toggleAddEscalationDrawer()
        setEscalationMetaData(row.original);
    }

    return (
        <>
            <ConfigDataGrid
                columns={columns}
                isLoading={isLoading}
                data={escalationConditions}
                totalPages={configTotalPages}
                enableSerchField
                onRowClick={onRowClick} />
            <DrawerExtended
                anchor="right"
                width="800px"
                open={openAddEscalationDrawer}
                header="View or Edit Escalation"
                onRenderContent={() => (
                    <EditEscalationContainer
                        toggleAddEscalationDrawer={toggleAddEscalationDrawer}
                        escalationMetadata={escalationMetaData as EscalationConditions} />
                )}
                onClose={toggleAddEscalationDrawer} />
        </>
    );
}

export default TicketEscalationList;
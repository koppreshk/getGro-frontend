import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";
import { DeleteTicketStatusContainer, EditTicketStatusContainer } from "modules/settings/containers/ticket-status";
import { useCallback, useState } from "react";

interface ITicketStatusListProps {
    statusData: IGenericResponse[] | undefined;
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IGenericResponse>();

    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            header: () => <span>Status ID</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("name", {
            id: 'name',
            header: () => <span>Status Name</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Status", arrow: true }} />
                        <DeleteTicketStatusContainer id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]
    return columns;
}

export const TicketStatusList = (props: ITicketStatusListProps) => {
    const { isLoading, statusData } = props;
    const columns = useColumns();
    const [rowData, setRowData] = useState({});
    const [showDrawer, setShowDrawer] = useState(false)

    const toggleDrawer = useCallback(() => {
        setShowDrawer((preValue) => !preValue);
    }, []);

    const onRowClick = useCallback((row: Row<IGenericResponse>) => {
        setRowData(row.original);
        toggleDrawer();
    }, [toggleDrawer]);

    return (
        <>
            <ConfigDataGrid columns={columns} data={statusData!} hideTableControls isLoading={isLoading} onRowClick={onRowClick} />
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Ticket Status"
                onRenderContent={() => (
                    <EditTicketStatusContainer onSelectRowMetaData={rowData as IGenericResponse} toggleDrawer={toggleDrawer} statusData={statusData}/>
                )}
                onClose={toggleDrawer}
            />
        </>
    )
}
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";
import { DeleteTicketStatusContainer, EditTicketStatusContainer } from "modules/settings/containers/ticket-status";

interface ITicketStatusListProps {
    statusData: IGenericResponse[] | undefined;
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IGenericResponse>();
    const { t } = useTranslation();

    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            header: () => <span>{t('modules.configurations.configurationOptions.tickets.ticketStatus.grid.statusId')}</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("name", {
            id: 'name',
            header: () => <span>{t('modules.configurations.configurationOptions.tickets.ticketStatus.grid.statusName')}</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>{t('modules.configurations.configurationOptions.tickets.ticketStatus.grid.actions')}</span>,
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
    const { t } = useTranslation();


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
                header={t('modules.configurations.configurationOptions.tickets.ticketStatus.editLabel')}
                onRenderContent={() => (
                    <EditTicketStatusContainer onSelectRowMetaData={rowData as IGenericResponse} toggleDrawer={toggleDrawer} statusData={statusData}/>
                )}
                onClose={toggleDrawer}
            />
        </>
    )
}
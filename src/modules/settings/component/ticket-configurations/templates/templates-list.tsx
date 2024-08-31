import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IGenericResponse } from "modules/settings/apis/templates/types";
import { DeleteTemplatesContainer, EditTemplatesContainer } from "modules/settings/containers/templates";
import { useCallback, useState } from "react";

interface ITemplatesListProps {
    statusData: IGenericResponse[] | undefined;
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IGenericResponse>();

    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            header: () => 'Status ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("name", {
            id: 'name',
            header: () => 'Status Name',
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Status", arrow: true }} />
                        <DeleteTemplatesContainer id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]
    return columns;
}

export const TemplatesList = (props: ITemplatesListProps) => {
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
            <ConfigDataGrid columns={columns} data={[]} hideTableControls isLoading={isLoading} onRowClick={onRowClick} />
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Ticket Status"
                onRenderContent={() => (
                    <EditTemplatesContainer onSelectRowMetaData={rowData as IGenericResponse} toggleDrawer={toggleDrawer} statusData={statusData}/>
                )}
                onClose={toggleDrawer}
            />
        </>
    )
}
import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IDispositionTypes } from "modules/settings/apis/disposition-types";
import { ITicketDispositionTypeLayoutProps } from "./ticket-disposition-type-layout";
import { DeleteDispositionTypeContainer } from "modules/settings/containers";
import { useCallback, useState } from "react";
import { EditDispositionTypeContainer } from "modules/settings/containers/ticket-disposition-type/edit-dispsostion-type-contianer";

const useColumns = () => {
    const columnHelper = createColumnHelper<IDispositionTypes>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            cell: info => info.getValue(),
            header: () => 'Name',
        }),
        columnHelper.accessor("id", {
            id: 'id',
            cell: info => info.getValue(),
            header: () => 'ID',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit' }} />
                        <DeleteDispositionTypeContainer id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

interface IDispositionTypeListProps extends ITicketDispositionTypeLayoutProps {

}

export const DispositionTypeList = (props: IDispositionTypeListProps) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const [rowMetaData, setRowMetaData] = useState({} as IDispositionTypes);
    const { data, isLoading } = props;
    const columns = useColumns();

    const toggleDispositionDrawer = () => {
        setShowDrawer((preValue) => !preValue);
    }

    const onRowClick = useCallback((row: Row<IDispositionTypes>) => {
        setShowDrawer(true);
        setRowMetaData(row.original);
    }, [])

    return (
        <>
            <ConfigDataGrid columns={columns} data={data!} enableSerchField isLoading={isLoading} onRowClick={onRowClick} />
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Disposition Type"
                onRenderContent={() => (
                    <EditDispositionTypeContainer onSelectRowMetaData={rowMetaData} toggleDispositionDrawer={toggleDispositionDrawer}/>
                )}
                onClose={toggleDispositionDrawer}
            />
        </>
    )
} 
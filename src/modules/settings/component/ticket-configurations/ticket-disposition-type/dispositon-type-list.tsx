import { Delete, Edit } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IDispositionTypes } from "modules/settings/apis/disposition-types";
import { ITicketDispositionTypeLayoutProps } from "./ticket-disposition-type-layout";

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
            cell: () => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit' }} />
                        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} />
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
    const { data, isLoading } = props;
    const columns = useColumns();

    return (
        <>
            <ConfigDataGrid columns={columns} data={data!} enableSerchField isLoading={isLoading} />
        </>
    )
} 
import { createColumnHelper } from "@tanstack/react-table";
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { ITag } from "modules/settings/apis/tags";
import { DeleteTicketStatusContainer } from "modules/settings/containers/ticket-status";
import { EditTag } from "./edit-tag";
import { Chip } from "@mui/material";

interface ITagsListProps {
    data: ITag[] | undefined;
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<ITag>();

    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            header: () => 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("name", {
            id: 'name',
            header: () => 'Name',
            cell: info => <Chip label={info.getValue()}/>,
        }),
        columnHelper.accessor("tickets", {
            id: 'tickets',
            header: () => 'Tickets',
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditTag id={original.id} name={original.name} />
                        <DeleteTicketStatusContainer id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]
    return columns;
}

export const TagsList = (props: ITagsListProps) => {
    const { isLoading, data } = props;
    const columns = useColumns();

    return (
        <>
            <ConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} />
        </>
    )
}
import { Chip } from "@mui/material";
import { DeleteTagsContainer } from "modules/settings/containers";
import { useTranslation } from "react-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { ITag } from "modules/settings/apis/tags";
import { EditTag } from "./edit-tag";

export interface ITagsListProps {
    data: ITag[] | undefined;
    isLoading: boolean;
}

const useColumns = (data: ITag[] | undefined) => {
    const columnHelper = createColumnHelper<ITag>();
    const { t } = useTranslation();
    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            header: () => t('name'),
            cell: ({ row: { original } }) => (
                <Chip label={!original.can_delete ? `${original.name} (System)` : original.name} color={!original.can_delete ? "info" : 'default'} variant={!original.can_delete ? "filled" : "outlined"} />
            ),
        }),
        columnHelper.accessor("tickets", {
            id: 'tickets',
            header: () => t('tickets_associated'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('actions'),
            cell: ({ row: { original } }) => {
                return (
                    <>
                        {
                            original.can_delete ?
                                <FlexBox flexDirection="row" gap="5px">
                                    <EditTag id={original.id} name={original.name} data={data!} />
                                    <DeleteTagsContainer id={original.id} />
                                </FlexBox> : null
                        }
                    </>
                )
            },
            enableSorting: false,
        })
    ]
    return columns;
}

export const TagsList = (props: ITagsListProps) => {
    const { isLoading, data } = props;
    const columns = useColumns(data);

    return (
        <div style={{ height: 'calc(100% - 209px' }}>
            <ConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} />
        </div>
    )
}
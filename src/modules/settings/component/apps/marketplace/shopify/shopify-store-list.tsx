import styled from "styled-components";
import { Edit } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";
import { DeleteShopifyStore } from ".";

export interface IShopifyStoreListProps {
    data: IShopifyStore[] | undefined
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IShopifyStore>();

    const column = [
        columnHelper.accessor("store_name", {
            id: 'name',
            header: () => 'Store Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("created_at", {
            id: 'Created At',
            header: () => 'Phone Number',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("admin", {
            id: 'Created By',
            header: () => 'Exotel Group Name',
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Queue", arrow: true }} />
                        <DeleteShopifyStore id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return column;
}

const StyledConfigDataGrid = styled(ConfigDataGrid)`
    padding: 0;
`;

export const ShopifyStoreList = (props: IShopifyStoreListProps) => {
    const { data, isLoading } = props;
    const columns = useColumns();

    return (
        <div style={{ width: '100%' }}>
            <StyledConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} />
        </div>
    )
}
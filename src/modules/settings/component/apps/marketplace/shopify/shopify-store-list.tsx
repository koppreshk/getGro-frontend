import styled from "styled-components";
import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";
import { DeleteShopifyStore } from ".";
import React, { useCallback, useState } from "react";
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog";

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
            header: () => 'Last Modified At',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("admin", {
            id: 'Created By',
            header: () => 'Last Modified By',
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Store", arrow: true }} />
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

    const [openPopup, setOpenPopup] = useState(false);
    const togglePopup = useCallback(() => {
        setOpenPopup((prevValue) => !prevValue)
    }, []);

    const [storeMetadata, setStoreMetadata] = useState({});

    const onRowClick = React.useCallback((row: Row<IShopifyStore>) => {
        togglePopup()
        setStoreMetadata(row.original);
    }, [togglePopup]);

    console.log('storeMetadata', storeMetadata);

    return (
        <div style={{ width: '100%' }}>
            <StyledConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} onRowClick={onRowClick}/>
            <AddAppConfigurationDialog
                dialogContent={() => <></>}
                openPopup={openPopup}
                togglePopup={togglePopup}
                title="Edit Shopify Store"
                maxWidth="md"
            />
        </div>
    )
}
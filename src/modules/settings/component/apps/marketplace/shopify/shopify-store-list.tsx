import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog";
import { EditShopifyConfigurationContainer } from "modules/settings/containers/marketplace/shopify";
import { DeleteShopifyStore } from "./delete-shopify-store";
import { useTranslation } from "react-i18next";

export interface IShopifyStoreListProps {
    data: IShopifyStore[] | undefined
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IShopifyStore>();
    const { t } = useTranslation();

    const column = [
        columnHelper.accessor("store_name", {
            id: 'name',
            header: () => t('store_name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("created_at", {
            id: 'Created At',
            header: () => t('last_modified_at'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("admin", {
            id: 'Created By',
            header: () => t('last_modified_by'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('actions'),
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

    return (
        <div style={{ width: '100%' }}>
            <StyledConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} onRowClick={onRowClick} />
            <AddAppConfigurationDialog
                dialogContent={() => <EditShopifyConfigurationContainer storeData={storeMetadata as IShopifyStore} togglePopup={togglePopup}/>}
                openPopup={openPopup}
                togglePopup={togglePopup}
                title="Edit Shopify Store"
                maxWidth="md"
            />
        </div>
    )
}
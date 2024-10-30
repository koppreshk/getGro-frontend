/// <reference types="vite-plugin-svgr/client" />

import { Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { AddAppConfigurationDialog, AppConfigurationLayout } from "..";
import ShopifyIcon from '../../../../../../assets/svg/shopify-icon.svg?react';
import { AddShopifyConfigContainer, ManageShopifyStoreContainer } from "modules/settings/containers/marketplace/shopify";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";

function OverviewContents() {
    return (
        <>
            <Typography variant="body2">Shopify is a comprehensive e-commerce platform that allows businesses to create and manage online stores and sell products or services.</Typography>
            <Typography variant="body2">Enhance customer support by seamlessly integrating your Shopify store with GetGro tickets, providing instant access to customer’s and order details, thus facilitating efficient issue resolution.</Typography>
            <Typography variant="body2">The Shopify and GetGro integration offers the following valuable features in ticket and contact modules:</Typography>
            <Typography variant="body2">
                <ul>
                    <li>Enhanced support for connecting multiple stores.</li>
                    <li>Seamless access and retrieval of comprehensive customer information.</li>
                    <li>Real-time access to a customer's recent orders, including item purchases, pricing, shipping charges, and discount specifics.</li>
                    <li>Comprehensive overviews of a customer's complete order history for a comprehensive understanding of their purchasing behavior.</li>
                </ul>
            </Typography>
        </>
    )
}

function InstallationContents() {
    return (
        <>
            <Typography variant="body2" paragraph>
                To Connect your Shopify store and display customer order information with GetGro, follow the instructions in the following links:
            </Typography>
            <Typography component="a" variant="body2" href="https://support.GetGro.com/kb/article/15906/set-up-shopify-integration-with-GetGro">
                https://support.GetGro.com/kb/article/15906/set-up-shopify-integration-with-GetGro
            </Typography>
        </>
    )
}

interface IShopifyConfigurationProps {
    data: IShopifyStore[];
}

export const ShopifyConfiguration = (props: IShopifyConfigurationProps) => {
    const { data } = props;
    const [openPopup, setOpenPopup] = useState(false);
    const togglePopup = useCallback(() => {
        setOpenPopup((prevValue) => !prevValue)
    }, []);

    const isInstalled = data.length > 0

    return (
        <>
            <AppConfigurationLayout
                InstallationContents={InstallationContents}
                OverviewContents={OverviewContents}
                appDescription="Connect your Shopify store and display customer order information."
                appTitle="Shopify"
                email="support@getgro.com"
                website="https://intent.getgro.io/dashboard"
                lastUpdated="May 12, 2024"
                publishedOn="May 12, 2024"
                version="1.0.0"
                appIcon={() => <ShopifyIcon width="60px" height="60px" />}
                togglePopup={togglePopup}
                isAppInstalled={isInstalled}
                onManageRenderContent={() => <ManageShopifyStoreContainer/>}
                isAppList
                 />
            <AddAppConfigurationDialog
                dialogContent={() => <AddShopifyConfigContainer togglePopup={togglePopup} />}
                openPopup={openPopup}
                togglePopup={togglePopup}
                title="Add Shopify Store"
                maxWidth="md"
            />
        </>
    )
}
/// <reference types="vite-plugin-svgr/client" />

import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import ShopifyIcon from '../../../../../../assets/svg/shopify-icon.svg?react';
import { useTheme } from "styled-components";
import { AddStoreDialog } from "./add-store-dialog";

export const ShopifyHeader = () => {
    const { pallete } = useTheme();
    const [open, setOpen] = React.useState(false);

    const toggleDialog = () => {
        setOpen((prevValue) => !prevValue);
    };

    return (
        <>
            <Card variant="elevation" elevation={1}>
                <CardContent>
                    <FlexBox justifyContent="space-between">
                        <FlexBox gap="25px" alignItems="center">
                            <ShopifyIcon width="48px" height="48px" />
                            <FlexBox flexDirection="column" gap="4px">
                                <Typography variant="h4">Shopify</Typography>
                                <Typography variant="subheading1" sx={{ color: pallete.grayNeutral }}>Connect your Shopify store and display customer order information.</Typography>
                            </FlexBox>
                        </FlexBox>
                        <Button variant="contained" size="small" onClick={toggleDialog}>Install</Button>
                        <AddStoreDialog onClose={toggleDialog} open={open} />
                    </FlexBox>
                </CardContent>
            </Card>
        </>
    )
}
/// <reference types="vite-plugin-svgr/client" />

import { Card, CardContent, Typography } from "@mui/material";
import { BreadCrumbs, FlexBox } from "lib/ui-ux"
import ShopifyIcon from '../../../../../assets/svg/shopify-icon.svg?react';
import ExotelIcon from '../../../../../assets/svg/exotel-icon.svg?react';

export const MarketPlaceLayout = () => {
    return (
        <>
            <FlexBox padding="20px" flexDirection="column" gap="20px">
                <BreadCrumbs />
                <ThirdPartyApplications />
            </FlexBox>
        </>
    )
}

const thirdPartyApps = [{
    name: 'exotel',
    label: 'Exotel',
    description: 'Track and manage phone calls as tickets',
    iconElement: () => <ExotelIcon width="40px" height="40px" />,
}, {
    name: 'shopify',
    label: 'Shopify',
    description: 'Connect your Shopify store and display customer order information',
    iconElement: () => <ShopifyIcon width="40px" height="40px" />,
}];

const ThirdPartyApplications = () => {
    return (
        <>
            <FlexBox gap="20px" padding="0px 20px">
                {thirdPartyApps.map((app) => (
                    <App {...app} key={app.name} />
                ))}
            </FlexBox>
        </>
    )
}

interface IAppProps {
    name: string;
    label: string;
    description: string;
    iconElement: () => JSX.Element;
}

const App = (props: IAppProps) => {
    const { description, label, iconElement } = props;
    return (
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <FlexBox flexDirection="column" gap="10px">
                    <FlexBox gap="20px" alignItems="center">
                        {iconElement()}
                        <Typography variant="h5">{label}</Typography>
                    </FlexBox>
                    <Typography variant="body3">{description}</Typography>
                </FlexBox>
            </CardContent>
        </Card>
    )
}

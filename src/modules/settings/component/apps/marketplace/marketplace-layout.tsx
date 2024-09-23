/// <reference types="vite-plugin-svgr/client" />

import { Route, Routes, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BreadCrumbs, FlexBox } from "lib/ui-ux"
import ShopifyIcon from '../../../../../assets/svg/shopify-icon.svg?react';
import ExotelIcon from '../../../../../assets/svg/exotel-icon.svg?react';
import WhatsAppIcon from '../../../../../assets/svg/whatsapp.svg?react';
import { WhatsAppConfigurationContainer } from "modules/settings/containers/marketplace/whatsApp/whatsApp-configuration-container";
import { ExotelConfigurationContainer } from "modules/settings/containers/marketplace/exotel";
import { ShopifyConfigurationContainer } from "modules/settings/containers/marketplace/shopify";

const MarketPlaceLayout = () => {
    return (
        <>
            <FlexBox padding="20px" flexDirection="column" gap="20px">
                <BreadCrumbs />
                <ThirdPartyApplications />
            </FlexBox>
        </>
    )
}

export default function MarketplaceRoutes() {
    return (
        <>
            <Routes>
                <Route key="marketplace-route" path="/" element={<MarketPlaceLayout />} />
                <Route key="shopify-route" path="shopify" element={<ShopifyConfigurationContainer />} />
                <Route key="exotel-route" path="exotel" element={<ExotelConfigurationContainer />} />
                <Route key="whatsapp-route" path="whatsapp" element={<WhatsAppConfigurationContainer />} />
            </Routes>
        </>
    )
}

const thirdPartyApps = [
    {
        name: 'exotel',
        label: 'Exotel',
        description: 'Track and manage phone calls as tickets',
        iconElement: () => <ExotelIcon width="40px" height="40px" />,
    }, {
        name: 'shopify',
        label: 'Shopify',
        description: 'Connect your Shopify store and display customer order information',
        iconElement: () => <ShopifyIcon width="40px" height="40px" />,
    }, {
        name: 'whatsapp',
        label: 'WhatsApp',
        description: 'Enhance customer engagement with WhatsApp integration with GupShup',
        iconElement: () => <WhatsAppIcon width="40px" height="40px" />,
    }
];

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
    const { description, label, name, iconElement } = props;
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 275, cursor: 'pointer' }} onClick={() => navigate(name)} elevation={2}>
            <CardActionArea>
                <CardContent>
                    <FlexBox flexDirection="column" gap="10px">
                        <FlexBox gap="20px" alignItems="center">
                            {iconElement()}
                            <Typography variant="h5">{label}</Typography>
                        </FlexBox>
                        <Typography variant="body3">{description}</Typography>
                    </FlexBox>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

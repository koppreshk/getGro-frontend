/// <reference types="vite-plugin-svgr/client" />

import { Route, Routes, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BreadCrumbs, FlexBox } from "lib/ui-ux"
import ShopifyIcon from '../../../../../assets/svg/shopify-icon.svg?react';
import ExotelIcon from '../../../../../assets/svg/exotel-icon.svg?react';
import GupShupIcon from '../../../../../assets/svg/gupshup.svg?react';
import WhatsAppIcon from '../../../../../assets/svg/whatsapp.svg?react';
import { GupShupConfigurationContainer } from "modules/settings/containers/marketplace/gupshup/gupshup-configuration-container";
import { ExotelConfigurationContainer } from "modules/settings/containers/marketplace/exotel";
import { ShopifyConfigurationContainer } from "modules/settings/containers/marketplace/shopify";
import { WhatsappConfigurationContainer } from "modules/settings/containers/marketplace/whatsapp";
import { InstagramConfigurationContainer } from "modules/settings/containers/marketplace/instagram";
import { FacebookConfigurationContainer } from "modules/settings/containers/marketplace/facebook";

import { Facebook, Instagram } from "@mui/icons-material";
import { useTheme } from "styled-components";

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
                <Route key="gupshup-route" path="gupshup" element={<GupShupConfigurationContainer />} />
                <Route key="whatsapp-meta-route" path="whatsapp" element={<WhatsappConfigurationContainer />} />
                <Route key="instagram-route" path="instagram" element={<InstagramConfigurationContainer />} />
                <Route key="facebook-route" path="facebook" element={<FacebookConfigurationContainer />} />
            </Routes>
        </>
    )
}
const useThirdPartyApps = () => {
    const theme = useTheme();

    return [
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
            name: 'gupshup',
            label: 'Gupshup',
            description: 'Enhance customer engagement with getgro WhatsApp integration via GupShup',
            iconElement: () => <GupShupIcon width="40px" height="40px" />,
        },
        {
            name: 'whatsapp',
            label: 'WhatsApp',
            description: 'Enhance customer engagement with getgro WhatsApp integration',
            iconElement: () => <WhatsAppIcon width="40px" height="40px" />,
        },
        {
            name: 'instagram',
            label: 'Instagram',
            description: 'Connect with Instagram and enhance customer engagement.',
            iconElement: () => <Instagram sx={{ width: '40px', height: '40px', fill: theme.channelSpecific.instagram + '!important', }} />,
        },
        {
            name: 'facebook',
            label: 'Facebook',
            description: 'Enhance customer engagement seamlessly with Getgro Facebook Integration.',
            iconElement: () => <Facebook sx={{ width: '40px', height: '40px', fill: theme.channelSpecific.facebook + '!important', }} />,
        }
    ];
}

const ThirdPartyApplications = () => {
    const thirdPartyApps = useThirdPartyApps();
    return (
        <>
            <FlexBox gap="20px" padding="0px 20px" flexWrap="wrap">
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
        <Card sx={{ maxWidth: 275, minWidth: 275, minHeight: 125, height: '100%', cursor: 'pointer' }} onClick={() => navigate(name)} elevation={2}>
            <CardActionArea sx={{ minHeight: 125 }}>
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

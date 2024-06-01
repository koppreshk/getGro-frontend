import { Box, Tabs, Tab, Typography, Divider } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { CustomTabPanel } from "modules/settings/component/ticket-configurations";
import React from "react";
import { useTheme } from "styled-components";

export const ShopifyContent = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, padding: "0 20px" }}>
                <FlexBox>
                    <Box width={"70%"}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Overview" />
                            <Tab label="Installation" />
                        </Tabs>
                        <OverView value={value} />
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box sx={{ padding: "72px 20px 20px 20px" }} width="30%">
                        <FlexBox flexDirection="column" gap="10px" padding="0 0 20px 0px">
                            <Typography variant="h5">More Info</Typography>
                            <FlexBox flexDirection="column" gap="15px">
                                <CommonInfo heading="Version" value="1.0.0" />
                                <CommonInfo heading="Published On" value="March 15, 2024" />
                                <CommonInfo heading="Last Updated" value="May 13, 2024" />
                            </FlexBox>
                        </FlexBox>
                        <Divider sx={{ mb: '15px' }} />
                        <FlexBox flexDirection="column" gap="10px">
                            <Typography variant="h5">Support</Typography>
                            <FlexBox flexDirection="column" gap="15px">
                                <CommonInfo heading="Website" value="https://support.getgro.io" valueType="link" />
                                <CommonInfo heading="Email" value="support.getgro.io" valueType="link" />
                            </FlexBox>
                        </FlexBox>
                    </Box>
                </FlexBox>
            </Box>

        </>
    )
}

const CommonInfo = (props: { heading: string, value: string, valueType?: string }) => {
    const { heading, value, valueType } = props;
    const { pallete } = useTheme();
    return (
        <>
            <FlexBox flexDirection="column">
                <Typography variant="h6">{heading}</Typography>
                {valueType === "link" ? <a href={value}>{value}</a> : <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>{value}</Typography>}
            </FlexBox>
        </>
    )
}
const OverView = (props: { value: number }) => {
    return (
        <>
            <CustomTabPanel value={props.value} index={0}>
                <FlexBox flexDirection="column" gap="20px" width="100%">
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
                </FlexBox>
            </CustomTabPanel>
        </>
    )
}
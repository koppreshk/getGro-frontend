import React from "react";
import styled, { useTheme } from 'styled-components'
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

const MoreInfoSection = styled(FlexBox)`
    margin-top: 48px;
    border-top:  1px solid #0000001f;
    border-left: 1px solid #0000001f;
`;

function tabAriaProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Content = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledFlexbox>
            <FlexBox flexDirection="column" width="70%">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Overview" {...tabAriaProps(0)} />
                        <Tab label="Installation" {...tabAriaProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {OverviewContents()}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {InstallationContents()}
                </CustomTabPanel>
            </FlexBox>
            <MoreInfoSection width="30%" padding="20px 16px">
                {MoreInfoContent()}
            </MoreInfoSection>
        </StyledFlexbox>
    )
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function OverviewContents() {
    return (
        <>
            <Typography variant="body2" paragraph>
                Exotel is a cloud-based communication platform enabling businesses to manage customer interactions via calls.
                It offers features such as virtual numbers and IVR systems for seamless communication.
            </Typography>
            <Typography variant="body2" paragraph>
                Integrate Exotel into GetGro to streamline call management processes, enabling businesses to effortlessly make
                and receive calls and tracking the call history in real-time.
            </Typography>
            <Typography variant="body2" paragraph>
                The Exotel integration offers the following valuable features, Within the GetGro
            </Typography>
            <ul>
                <li><b>Direct Call Functionality:</b> Users can initiate calls directly from the GetGro interface, boosting efficiency.</li>
                <li><b>Number Assignment:</b> Allocate various Exotel numbers to distinct categories, streamlining call prioritization.</li>
                <li><b>Call History Monitoring:</b> Keep track of call activities in real-time by agent, ensuring transparency and accountability.</li>
                <li><b>Ticket Generation:</b> Simplify post-call actions with auto-created tickets for outbound, inbound, or missed calls.</li>
                <li><b>Manual Ticket Creation: </b>Offer flexibility by allowing manual ticket logging based on call history, providing additional control.</li>
            </ul>
        </>
    )
}

function InstallationContents() {
    return (
        <>
            <Typography variant="body2" paragraph>
                To install and connect Exotel with GetGro, follow the instructions in the following links:
            </Typography>
            <Typography component="a" variant="body2" href="https://support.GetGro.com/kb/article/15906/set-up-exotel-integration-with-GetGro">
                https://support.GetGro.com/kb/article/15906/set-up-exotel-integration-with-GetGro
            </Typography>
        </>
    )
}

function MoreInfoContent() {
    const { pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" gap="8px">

            <Typography variant="h5">
                More Info
            </Typography>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Version</Typography>
                <Typography variant="body2" >1.0.0</Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Published on</Typography>
                <Typography variant="body2" >May 12, 2024</Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Last Updated</Typography>
                <Typography variant="body2" >May 12, 2024</Typography>
            </FlexBox>
            <Typography variant="h5">
                Support
            </Typography>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Website</Typography>
                <Typography variant="body2" >https://intent.getgro.io/dashboard</Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Email</Typography>
                <Typography variant="body2" >support@getgro.com</Typography>
            </FlexBox>
        </FlexBox>
    )
}
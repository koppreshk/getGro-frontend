import React, { useMemo } from "react";
import styled from "styled-components";
import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { ChangePassword, GeneralInfo, GenerateAPIKeys } from ".";
import { Status } from "modules/core/components/parts/agent-status";

const StyledLayoutPage = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
`;

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
    background-color: ${({ theme }) => theme.pallete.white};
`;

export const UserProfileLayout = () => {
    return (
        <StyledLayoutPage width="100%" height="100%" flexDirection="column" gap="14px" padding="24px">
            <Typography variant="h4" textTransform={"capitalize"}>Personal Settings</Typography>
            <FlexBox gap="20px" width="100%" height="calc(100% - 40px)">
                <ProfileHeader />
                <ProfileDetails />
            </FlexBox>
        </StyledLayoutPage>
    )
}

const ProfileHeader = () => {

    return (
        <StyledFlexbox style={{ flex: '1' }} height="400px" >
            <FlexBox gap="12px" flexDirection="column" width="100%">
                <CustomerAvatar customerName="Jon Snow" />
                <FlexBox flexDirection='column' padding='0 0 0 20px' gap="6px">
                    <Typography variant='h5'>Jon Snow</Typography>
                    <Typography variant='caption'>jonsnow@getgro.io</Typography>

                    <FlexBox style={{ textTransform: 'unset', gap: '6px' }} flexDirection="row" alignItems="center">
                        <Status $status="Online" />
                        <Typography variant="h6">
                            Online
                        </Typography>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </StyledFlexbox>
    )
}

function tabAriaProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProfileDetails = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledFlexbox style={{ flex: '5' }}>
            <FlexBox flexDirection="column" width="100%">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="General" {...tabAriaProps(0)} />
                        <Tab label="Signature" {...tabAriaProps(1)} />
                        <Tab label="Change Password" {...tabAriaProps(2)} />
                        <Tab label="API Keys" {...tabAriaProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <GeneralInfo />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    dasdas
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ChangePassword />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <GenerateAPIKeys />
                </CustomTabPanel>
            </FlexBox>
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


const CustomerAvatar = (props: { customerName: string }) => {
    const { customerName } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(customerName)), [customerName]);

    return (
        <FlexBox flexDirection="row" width="100%" alignItems="center" padding="30px 0">
            <HorizontalSeparator />
            <Avatar sx={{
                color: textColor,
                bgcolor: backgroundColor,
                width: '120px',
                height: '120px',
                fontSize: '4rem',
            }}>
                {getInitialsByName(customerName)}
            </Avatar>
            <HorizontalSeparator />
        </FlexBox>

    )
}
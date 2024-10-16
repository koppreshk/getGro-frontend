import React, { useMemo } from "react";
import styled from "styled-components";
import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { ChangePassword, RolesPermissionsTab } from ".";
import { Status } from "modules/core/components/parts/agent-status";
import { useAppSelector } from "lib/hooks";
import { useFetchCurrentStatus } from "modules/settings/apis/users-and-permissions";

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
    const config = useAppSelector((state) => state.core.config);
    const { data: currentStatus } = useFetchCurrentStatus();

    return (
        <StyledFlexbox style={{ flex: '1' }} height="400px" >
            <FlexBox gap="12px" flexDirection="column" width="100%">
                <CustomerAvatar customerName={config?.user_details.display_name || ''} />
                <FlexBox flexDirection='column' padding='0 0 0 20px' gap="6px">
                    <Typography variant='h5'>{config?.user_details.display_name}</Typography>
                    <Typography variant='caption'>{config?.user_details.email}</Typography>

                    <FlexBox style={{ textTransform: 'unset', gap: '6px' }} flexDirection="row" alignItems="center">
                        <Status $status={currentStatus?.name} />
                        <Typography variant="h6">
                            {currentStatus?.name}
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

    const renderByvalue = () => {
        switch (value) {
            case 0:
                return <RolesPermissionsTab />
            case 1:
                return <ChangePassword />
            default: return null;
        }
    }

    return (
        <StyledFlexbox style={{ flex: '5' }}>
            <FlexBox flexDirection="column" width="100%">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Roles and Permissions" {...tabAriaProps(0)} />
                        <Tab label="Change Password" {...tabAriaProps(0)} />
                    </Tabs>
                </Box>
                {renderByvalue()}
            </FlexBox>
        </StyledFlexbox>
    )
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
                textDecoration: 'uppercase'
            }}>
                {getInitialsByName(customerName).toLocaleUpperCase()}
            </Avatar>
            <HorizontalSeparator />
        </FlexBox>

    )
}
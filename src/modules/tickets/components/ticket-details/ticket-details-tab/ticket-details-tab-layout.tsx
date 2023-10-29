import React from "react";
import { FlexBox } from "lib/ui-ux"
import { Avatar, IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { Platform } from "../ticket-conversation/ticket-conversation-header";
import { PersonSearch } from '@mui/icons-material';

export const TicketDeatilsTabLayout = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = React.useCallback((_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    return (
        <FlexBox $flexDirection="column" style={{ backgroundColor: '#fff' }} $width="100%">
            <Tabs value={value} onChange={handleChange} aria-label="Ticket Details Tab Layout">
                <Tab label="Ticket Details" id="ticket-details" />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <TicketDetails />
            </CustomTabPanel>
        </FlexBox>
    )
}

const TicketDetails = () => {
    const [showSearchUserFlyout, setShowUserFlyout] = React.useState(false);
    const onSearchUserBtnClick = React.useCallback(() => {
        setShowUserFlyout(!showSearchUserFlyout);
    }, [showSearchUserFlyout]);

    return (
        <FlexBox $gap="30px" $padding="10px" $flexDirection="column">
            <FlexBox $justifyContent="space-between">
                <FlexBox $gap="5px" $alignItems="center">
                    <Typography variant="h5" fontSize="16px" >Tilly Moughton messaged via</Typography>
                    <Platform variant="body2" $platform={'facebook'}>facebook</Platform>
                </FlexBox>
                <Tooltip title="Search User">
                    <IconButton onClick={onSearchUserBtnClick}>
                        <PersonSearch />
                    </IconButton>
                </Tooltip>
            </FlexBox>
            <ContactInfo />
        </FlexBox>
    )
}

const ContactInfo = () => {
    return (
        <FlexBox $gap="20px" $flexDirection="column">
            <FlexBox $gap="10px" $alignItems="center">
                <Avatar>TM</Avatar>
                <Typography variant="h6" fontSize="16px" >Tilly Moughton</Typography>
            </FlexBox>
            <FlexBox $gap="8px" $flexDirection="column">
                <Typography variant="body2" fontWeight={'500'}>Email</Typography>
                <Typography variant="body2" >test@gmail.com</Typography>
            </FlexBox>
            <FlexBox $gap="8px" $flexDirection="column">
                <Typography variant="body2" fontWeight={'500'}>Phone</Typography>
                <Typography variant="body2" >9867998789</Typography>
            </FlexBox>
        </FlexBox>
    )
}
function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}
import React from "react";
import { PersonSearch, PersonRemove } from "@mui/icons-material";
import { Typography, Tooltip, IconButton, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { Platform } from "../ticket-conversation/ticket-conversation-header";
import { SearchCustomerContainer } from "modules/tickets/containers";

export const TicketOverview = () => {
    const [showSearchUserFlyout, setShowSearchUserFlyout] = React.useState(false);
    const onSearchUserBtnClick = React.useCallback(() => {
        setShowSearchUserFlyout((x) => !x);
    }, []);

    const detach = false;

    return (
        <FlexBox $gap="30px" $padding="10px" $flexDirection="column">
            <FlexBox $justifyContent="space-between">
                <FlexBox $gap="5px" $alignItems="center">
                    <Typography variant="h5" fontSize="16px" >Tilly Moughton messaged via</Typography>
                    <Platform variant="body2" $platform={'facebook'}>facebook</Platform>
                </FlexBox>
                <Tooltip title="Search User" arrow placement="left">
                    <IconButton onClick={onSearchUserBtnClick}>
                        <PersonSearch />
                    </IconButton>
                </Tooltip>
                {detach ?
                    <Tooltip title="Detach User">
                        <IconButton>
                            <PersonRemove />
                        </IconButton>
                    </Tooltip> : null}
            </FlexBox>
            <ContactInfo />
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick}/>
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

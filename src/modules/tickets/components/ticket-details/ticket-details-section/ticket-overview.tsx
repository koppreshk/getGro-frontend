import React from "react";
import { PersonSearch, PersonRemove } from "@mui/icons-material";
import { Typography, Tooltip, IconButton, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { Platform } from "../ticket-conversation/ticket-conversation-header";
import { SearchCustomerContainer } from "modules/tickets/containers";
import { useAppSelector } from "lib/hooks";
import { getInitialsByName } from "lib/utils";

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
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick} />
        </FlexBox>
    )
}

const ContactInfo = () => {
    const { email, name, phoneNumber, customerId } = useAppSelector((state) => state.tickets.linkedCustomer);
    return (
        <FlexBox $gap="20px" $flexDirection="column">
            <FlexBox $gap="10px" $alignItems="center">
                {name === undefined ? <Avatar /> : <Avatar>{getInitialsByName(name)}</Avatar>}
                <Typography variant="h6" fontSize="16px" >{name ?? 'NA'}</Typography>
            </FlexBox>
            <FlexBox $gap="4px" $flexDirection="column">
                <Typography variant="body2" fontWeight={'500'}>Email</Typography>
                <Typography variant="body2" >{email === '' || email === undefined ? 'NA' : email}</Typography>
            </FlexBox>
            <FlexBox $gap="4px" $flexDirection="column">
                <Typography variant="body2" fontWeight={'500'}>Phone</Typography>
                <Typography variant="body2" >{phoneNumber ?? 'NA'}</Typography>
            </FlexBox>
            <FlexBox $gap="4px" $flexDirection="column">
                <Typography variant="body2" fontWeight={'500'}>Customer Id</Typography>
                <Typography variant="body2" >{customerId === undefined ? 'NA' : customerId}</Typography>
            </FlexBox>
        </FlexBox>
    )
}

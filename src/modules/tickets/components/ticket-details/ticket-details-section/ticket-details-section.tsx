import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { Platform } from "../ticket-conversation/ticket-conversation-header";
import { PersonRemove, PersonSearch } from '@mui/icons-material';
import { TicetSideMenu } from "./ticket-side-menu";
import { GridLayout } from "lib/ui-ux";
import { SearchCustomerContainer } from "modules/tickets/containers";

const StyledGridLayout = styled(GridLayout)`  
    background-color: ${({ theme }) => theme.pallete.white};
`;

export const TicketDeatilsSection = () => {
    const [selectedMenuOption, setSelectedMenuOption] = React.useState('customer-profile');

    const onMenuOptionClick = React.useCallback((id: string) => {
        setSelectedMenuOption(id);
    }, []);

    return (
        <StyledGridLayout $gridTemplateColumns={"auto 56px"} $width="100%">
            <TicketOverview />
            <TicetSideMenu onSetMenuOption={onMenuOptionClick} selectedMenuOption={selectedMenuOption} />
        </StyledGridLayout>
    )
}

const TicketOverview = () => {
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
                <Tooltip title="Search Customer" arrow placement="left">
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

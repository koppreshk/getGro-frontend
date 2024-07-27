import { CustomIconButton, FlexBox, RefreshButton } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import { ArrowBack } from '@mui/icons-material/';
import { Menu, MenuItem, Typography } from "@mui/material";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import React from "react";
import { TicketViewActionButtons } from ".";


export const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const TicketListViewHeader = () => {
    const match = useMatch('/tickets/:ticketType/:ticketId')
    const header = match?.params.ticketType?.split('-').map((item) => {
        const newString = item.charAt(0).toUpperCase() + item.slice(1);
        return newString;
    }).join(' ');
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <HeaderWrapper width="100%" justifyContent="space-between">
            <FlexBox>
                <CustomIconButton onClick={() => { navigate(-1) }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                <FlexBox alignItems="center" gap="5px">
                    <Typography variant="h5">{header}</Typography>
                    <FlexBox>
                        <RefreshButton />
                        <CustomIconButton tooltipProps={{ title: 'Sort' }} iconComponent={<SortIcon />} onClick={handleClick} />
                    </FlexBox>
                    <Menu open={open} anchorEl={anchorEl} onClose={handleClose} >
                        <MenuItem>Status</MenuItem>
                        <MenuItem>Due Date</MenuItem>
                        <MenuItem>Source</MenuItem>
                    </Menu>
                </FlexBox>
            </FlexBox>
            <TicketViewActionButtons />
        </HeaderWrapper>
    )
}
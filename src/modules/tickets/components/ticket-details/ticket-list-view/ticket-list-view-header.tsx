import { CustomIconButton, FlexBox } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import { ArrowBack } from '@mui/icons-material/';
import { Chip, Menu, MenuItem, Typography } from "@mui/material";
import styled from "styled-components";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import React from "react";
import { TicketViewActionButtons } from ".";


export const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const TicketListViewHeader = () => {
    const [searchParams] = useSearchParams();
    const match = useMatch('/tickets/:ticketType/:ticketId')
    const noOfRecords = searchParams.get('noOfRecords');
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
                <FlexBox alignItems="center" gap="10px">
                    <Typography variant="h5">{header}</Typography>
                    <Chip label={noOfRecords} size="small" variant="filled" color="primary" />
                    <CustomIconButton tooltipProps={{ title: 'Sort' }} iconComponent={<SortIcon />} onClick={handleClick} />
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
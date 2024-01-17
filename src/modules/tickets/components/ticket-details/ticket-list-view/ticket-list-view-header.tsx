import { CustomIconButton, FlexBox } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import { PhoneRounded, PostAdd } from '@mui/icons-material/';
import { Chip, Menu, MenuItem, Typography } from "@mui/material";
import styled from "styled-components";
import { useMatch, useSearchParams } from "react-router-dom";
import React, { useCallback } from "react";
import { TelephonicDialer } from "../ticket-conversation/telephonic-conversations";
import { AddTicket } from "./add-ticket";

const StyledIconButtons = styled(CustomIconButton)`
    && {
        border: 1px solid;
        border-color: #DAE2ED;
        border-radius: 12px;
    };
    & :hover {
        background-color: #fafafa;
    }
`;


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
    }).join(' ')

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [openCallPopUp, setOpenCallPopUp] = React.useState(false);
    const [openAddTicketDrawer, setOpenAddTicketDrawer] = React.useState(false);

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    const toggleAddTicketDrawer = useCallback(() => {
        setOpenAddTicketDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <HeaderWrapper width="100%" justifyContent="space-between">
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
            <FlexBox gap="5px" alignItems="center">
                <StyledIconButtons iconComponent={<PhoneRounded fontSize="small" />} size="small" color="primary" onClick={toggleCallBtn} tooltipProps={{ title: 'Make a call' }} />
                <StyledIconButtons iconComponent={<PostAdd fontSize="small" />} size="small" color="primary" onClick={toggleAddTicketDrawer} tooltipProps={{ title: 'Add Ticket' }} />
            </FlexBox>
            <TelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} />
            <AddTicket openAddTicketDrawer={openAddTicketDrawer} toggleAddTicketDrawer={toggleAddTicketDrawer} />
        </HeaderWrapper>
    )
}
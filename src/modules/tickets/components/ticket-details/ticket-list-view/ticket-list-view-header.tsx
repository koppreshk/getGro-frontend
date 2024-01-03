import { CustomIconButton, FlexBox } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import styled from "styled-components";
import { useMatch, useSearchParams } from "react-router-dom";
import React, { useCallback } from "react";
import { TelephonicDialer } from "../ticket-conversation/telephonic-conversations";

const StyledIconButtons = styled(IconButton)`
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

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    return (
        <HeaderWrapper $width="100%" $justifyContent="space-between">
            <FlexBox $alignItems="center" $gap="10px">
                <Typography variant="h5">{header}</Typography>
                <Chip label={noOfRecords} size="small" variant="filled" color="primary" />
                <CustomIconButton tooltipProps={{ title: 'Sort' }} iconComponent={<SortIcon />} onClick={handleClick} />
                <Menu open={open} anchorEl={anchorEl} onClose={handleClose} >
                    <MenuItem>Status</MenuItem>
                    <MenuItem>Due Date</MenuItem>
                    <MenuItem>Source</MenuItem>
                </Menu>
            </FlexBox>
            <FlexBox $gap="5px" $alignItems="center">
                <StyledIconButtons size="small" color="primary" onClick={toggleCallBtn}>
                    <PhoneRoundedIcon fontSize="small" />
                </StyledIconButtons>
                <StyledIconButtons size="small" color="primary">
                    <MessageRoundedIcon fontSize="small" />
                </StyledIconButtons>
            </FlexBox>
            <TelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn}/>
        </HeaderWrapper>
    )
}
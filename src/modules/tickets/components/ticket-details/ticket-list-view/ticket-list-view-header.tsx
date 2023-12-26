import { FlexBox } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Chip, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import styled from "styled-components";
import { useMatch, useSearchParams } from "react-router-dom";
import React from "react";

interface IStyledIconButtonProps {
    children?: React.ReactNode;
}

const StyledIconButton = (props: IStyledIconButtonProps) => (
    <IconButton color="primary" sx={{ border: '1px solid', borderColor: '#DAE2ED', borderRadius: '12px', ":hover": { bgcolor: "#fafafa" } }} size="small">
        {props.children}
    </IconButton>
);


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

    return (
        <HeaderWrapper $width="100%" $justifyContent="space-between">
            <FlexBox $alignItems="center" $gap="10px">
                <Typography variant="h5">{header}</Typography>
                <Chip label={noOfRecords} size="small" variant="filled" color="primary" />
                <Tooltip title="Sort">
                    <IconButton aria-label="Sort" onClick={handleClick}>
                        <SortIcon />
                    </IconButton>
                </Tooltip>
                <Menu open={open} anchorEl={anchorEl} onClose={handleClose} >
                    <MenuItem>Status</MenuItem>
                    <MenuItem>Due Date</MenuItem>
                    <MenuItem>Source</MenuItem>
                </Menu>
            </FlexBox>
            <FlexBox $gap="5px">
                <StyledIconButton>
                    <PhoneRoundedIcon fontSize="small" />
                </StyledIconButton>
                <StyledIconButton>
                    <MessageRoundedIcon fontSize="small" />
                </StyledIconButton>
            </FlexBox>
        </HeaderWrapper>
    )
}
import { FlexBox } from "lib/ui-ux";
import { ITicketDetails } from "../apis";
import styled from 'styled-components';
import { Tooltip, Typography } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Priority, useSourceIcon } from "./display-tickets-grid";
import { TicketStatusContainer } from "../containers";
import { useMatch, useNavigate } from "react-router-dom";
import React from "react";

const StyledCard = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    cursor: pointer;
`;

const onRenderSeparator = () => {
    return (
        <span>-</span>
    )
}

export const CardView = (props: ITicketDetails) => {
    const { ticketId, customerName, createdAt, source, ticketStatus, statusUpdateString, priority } = props;
    const getSourceIcon = useSourceIcon();
    const navigate = useNavigate();
    const match = useMatch('/:tickets/:ticketType')
    
    const onRowClick = React.useCallback(() => {
        navigate(`${match?.pathname}/${ticketId}`, { replace: true });
    }, [match?.pathname, navigate, ticketId]);

    return (
        <StyledCard padding="20px" flexDirection="row" justifyContent="space-between" onClick={onRowClick}>
            <FlexBox flexDirection="column" gap={'10px'}>
                <FlexBox gap={'5px'} alignItems="center">
                    <AccountCircleOutlined />
                    <Tooltip title={'Customer Name'}>
                        <Typography variant="h5">{customerName}</Typography>
                    </Tooltip>
                </FlexBox>
                <FlexBox gap={'20px'} renderSeparator={onRenderSeparator} alignItems="center">
                    <Tooltip title={`Ticketd Id: ${ticketId}`}>
                        <Typography variant="body2" maxWidth={'200px'} sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ticketId}</Typography>
                    </Tooltip>
                    <Tooltip title={'Created At'}>
                        <Typography variant="body2">Created at {createdAt}</Typography>
                    </Tooltip>
                    <FlexBox gap={'5px'} alignItems="center">
                        {getSourceIcon(source)}
                        <Typography variant="body2">{source}</Typography>
                    </FlexBox>
                </FlexBox>
                <Priority priority={priority} />
            </FlexBox>
            <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} statusUpdateString={statusUpdateString} />
        </StyledCard>
    )
}
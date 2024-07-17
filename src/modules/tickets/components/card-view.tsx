import { FlexBox, VerticalSeparator } from "lib/ui-ux";
import { ITicketDetails } from "../apis";
import styled from 'styled-components';
import { Tooltip, Typography } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Priority, ResDue, useSourceIcon } from "./display-tickets-grid";
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
        <VerticalSeparator />
    )
}

export const CardView = (props: ITicketDetails) => {
    const { ticketId, customerName, createdAt, source, ticketStatus, statusUpdateString, priority, resolutionDue } = props;
    const getSourceIcon = useSourceIcon();
    const navigate = useNavigate();
    const match = useMatch('/:tickets/:ticketType')

    const onRowClick = React.useCallback(() => {
        navigate(`${match?.pathname}/${ticketId}`, { replace: true });
    }, [match?.pathname, navigate, ticketId]);

    return (
        <StyledCard padding="20px" flexDirection="row" justifyContent="space-between" alignItems="center" onClick={onRowClick} renderSeparator={onRenderSeparator}>
            <FlexBox flexDirection="column" gap={'10px'}>
                <FlexBox gap={'5px'} alignItems="center">
                    <AccountCircleOutlined />
                    <Tooltip title={'Customer Name'}>
                        <Typography variant="h5">{customerName}</Typography>
                    </Tooltip>
                </FlexBox>
                <FlexBox gap={'10px'} flexDirection="column">
                    <Priority priority={priority} />
                    {resolutionDue ? <ResDue date={resolutionDue} /> : null}
                </FlexBox>
            </FlexBox>
            <FlexBox gap={'20px'} justifyContent="space-between">
                <FlexBox flexDirection="column" alignItems="center">
                    <Typography variant="body2" maxWidth={'200px'} sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ticketId}</Typography>
                    <Typography variant="subtitle2">Ticket Id</Typography>
                </FlexBox>
                <FlexBox flexDirection="column" alignItems="center">
                    <Typography variant="body2">{createdAt}</Typography>
                    <Typography variant="subtitle2">Created At</Typography>
                </FlexBox>
                <FlexBox flexDirection="column" alignItems="center">
                    <FlexBox gap={'5px'} alignItems="center">
                        {getSourceIcon(source)}
                        <Typography variant="body2">{source}</Typography>
                    </FlexBox>
                    <Typography variant="subtitle2">Source</Typography>
                </FlexBox>
            </FlexBox>
            <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} statusUpdateString={statusUpdateString} />
        </StyledCard>
    )
}
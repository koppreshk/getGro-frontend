import React from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import { Tooltip, Typography } from "@mui/material";
import { AccountCircleOutlined, CalendarToday, ConfirmationNumberOutlined } from "@mui/icons-material";
import { FlexBox, GridLayout, VerticalSeparator } from "lib/ui-ux";
import { ITicketDetails } from "../../apis";
import { Priority, ResDue, useSourceIcon } from "../display-tickets-grid";
import { TicketStatusContainer } from "../../containers";

const StyledCard = styled(GridLayout)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    cursor: pointer;
    padding: 10px 20px;
    grid-template-columns: 1fr 2fr auto;
    align-items: center;
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
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');

    const onRowClick = React.useCallback(() => {
        navigate(`${match?.pathname}/${ticketId}?noOfRecords=${noOfRecords}&pageNumber=${pageNumber}`, { replace: true });
    }, [match?.pathname, navigate, noOfRecords, pageNumber, ticketId]);

    return (
        <StyledCard onClick={onRowClick} >
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
            <FlexBox gap={'20px'} renderSeparator={onRenderSeparator}>
                <FlexBox flexDirection="column" alignItems="center">
                    <FlexBox gap={'5px'} alignItems="center">
                        <ConfirmationNumberOutlined />
                        <Typography variant="body2" maxWidth={'200px'} sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ticketId}</Typography>
                    </FlexBox>
                    <Typography variant="subtitle2">Ticket Id</Typography>
                </FlexBox>
                <FlexBox flexDirection="column" alignItems="center">
                    <FlexBox gap={'5px'} alignItems="center">
                        <CalendarToday />
                        <Typography variant="body2">{createdAt}</Typography>
                    </FlexBox>
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
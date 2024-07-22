import React, { useMemo } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import { Avatar, Tooltip, Typography } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { FlexBox, VerticalSeparator } from "lib/ui-ux";
import { ITicketDetails } from "../../apis";
import { Priority, useSourceIcon } from "../display-tickets-grid";
import { TicketStatusContainer } from "../../containers";
import { DateTime } from "luxon";
import { chooseRandomColors, getInitialsByName } from "lib/utils";

const StyledCard = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    cursor: pointer;
    padding: 10px 20px;
`;

const StyledTypography = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant3};
    }
`;

const onRenderSeparator = () => {
    return (
        <VerticalSeparator />
    )
}

const StyledPriority = styled(Priority)`
    border-radius: 4px;
    height: 31px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

export const CardView = (props: ITicketDetails) => {
    const { ticketId, customerName, createdAt, source, ticketStatus, priority, description } = props;
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
        <StyledCard onClick={onRowClick} justifyContent="space-between">
            <FlexBox gap={'5px'} flexDirection="column">
                <Typography variant="h5">{description}</Typography>
                <FlexBox gap={'20px'} renderSeparator={onRenderSeparator} alignItems="center">
                    <StyledTypography
                        variant="body2"
                        maxWidth={'80px'}>{'#' + ticketId.split('-')[0]}</StyledTypography>
                    <CustomerName customerName={customerName} />
                    <CreatedAt createdAt={createdAt} />
                    <FlexBox gap={'5px'} alignItems="center">
                        {getSourceIcon(source)}
                        <StyledTypography variant="body2">{source}</StyledTypography>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
            <FlexBox alignItems="center">
                <StyledPriority priority={priority} />
                <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} statusUpdateString={''} renderMode="card" />
            </FlexBox>
        </StyledCard>
    )
}

const CustomerName = (props: Pick<ITicketDetails, 'customerName'>) => {
    const { customerName } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(customerName)), [customerName]);

    return (
        <FlexBox gap={'5px'} alignItems="center">
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor, width: '24px', height: '24px', fontSize: '12px' }}>{getInitialsByName(customerName)}</Avatar>
            <Tooltip title={'Customer Name'}>
                <Typography variant="body2" >{customerName}</Typography>
            </Tooltip>
        </FlexBox>
    )
}

const CreatedAt = (props: Pick<ITicketDetails, 'createdAt'>) => {
    const parsedDate = DateTime.fromFormat(props.createdAt, 'yyyy-MM-dd hh:mm a');
    const diff = parsedDate.diffNow();

    const { days, hours, minutes, seconds } = diff.shiftTo('days', 'hours', 'minutes', 'seconds').toObject();
    const parsedDateValue = Math.abs(days!) > 0 ? `${Math.abs(days!)} days` : Math.abs(hours!) > 0 ? `${Math.abs(hours!)} hours` : Math.abs(minutes!) > 0 ? `${Math.abs(Math.round(minutes!))} mins` : `${Math.abs(Math.round(seconds!))} seconds`;

    return (
        <>
            <FlexBox gap={'5px'} alignItems="center">
                <CalendarToday />
                <StyledTypography variant="body2">{`Created ${parsedDateValue} ago`}</StyledTypography>
            </FlexBox>
        </>
    )

}
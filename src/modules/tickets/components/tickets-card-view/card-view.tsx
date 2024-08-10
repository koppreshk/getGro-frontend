import React, { useMemo } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import { Avatar, Tooltip, Typography, SxProps } from "@mui/material";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import { CircularSeparator, FlexBox, VerticalSeparator } from "lib/ui-ux";
import { ITicketDetails } from "../../apis";
import { Priority } from "../display-tickets-grid";
import { TicketStatusContainer } from "../../containers";
import { DateTime } from "luxon";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { useSourceIcon } from "modules/tickets/hooks";

const StyledCard = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: 1px solid #F1F2F4;
    cursor: pointer;
    padding: 15px 20px 15px;

    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
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

const NameAndSourceContent = styled(FlexBox)`
    margin-top: 14px;
`;

const iconStyles: SxProps = { height: '16px', width: '16px', fill: '#787f83' }

export const CardView = (props: ITicketDetails) => {
    const { ticketId, customerName, createdAt, source, ticketStatus, priority, description, resolutionDue } = props;
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
        <StyledCard onClick={onRowClick} alignItems="center" justifyContent="space-between">

            <FlexBox alignItems="center" gap="18px">
                <CustomerName customerName={customerName} />

                <FlexBox flexDirection="column" gap="14px">
                    <div>
                        <Typography variant="h5">{description}</Typography>

                        <NameAndSourceContent gap="10px" alignItems="center" renderSeparator={() => <CircularSeparator />}>
                            <Tooltip title={'Customer Name'}>
                                <Typography variant="body2" >{customerName}</Typography>
                            </Tooltip>
                            <FlexBox gap={'5px'} alignItems="center">
                                <StyledTypography variant="subheading1" >via</StyledTypography>
                                {getSourceIcon(source)}
                                <StyledTypography variant="body2">{source}</StyledTypography>
                            </FlexBox>
                        </NameAndSourceContent>
                    </div>

                    <FlexBox gap={'20px'} renderSeparator={onRenderSeparator} alignItems="center">
                        <StyledTypography
                            variant="body2"
                            width={'80px'}>{'#' + ticketId.split('-')[0]}</StyledTypography>
                        <CreatedAt createdAt={createdAt} />
                        <ResolutionDue resolutionDue={resolutionDue} />
                    </FlexBox>

                </FlexBox>
            </FlexBox>

            <FlexBox alignItems="center">
                <StyledPriority priority={priority} />
                <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} statusUpdateString={''} renderMode="card" />
            </FlexBox>
        </StyledCard >
    )
}

const CustomerName = (props: Pick<ITicketDetails, 'customerName'>) => {
    const { customerName } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(customerName)), [customerName]);

    return (
        <Avatar sx={{ 
            color: textColor, 
            bgcolor: backgroundColor, 
            width: '52px', 
            height: '52px', 
            fontSize: '20px',
            borderRadius: '20%'
         }}>{getInitialsByName(customerName)}</Avatar>
    )
}

const CreatedAt = (props: Pick<ITicketDetails, 'createdAt'>) => {
    const parsedDate = DateTime.fromFormat(props.createdAt, 'yyyy-MM-dd hh:mm a');
    const diff = parsedDate.diffNow();

    const { days, hours, minutes, seconds } = diff.shiftTo('days', 'hours', 'minutes', 'seconds').toObject();
    const parsedDateValue = Math.abs(days!) > 0 ? `${Math.abs(days!)} days` : Math.abs(hours!) > 0 ? `${Math.abs(hours!)} hours` : Math.abs(minutes!) > 0 ? `${Math.abs(Math.round(minutes!))} mins` : `${Math.abs(Math.round(seconds!))} seconds`;

    return (
        <Tooltip title={`Created ${parsedDateValue} ago`}>
            <FlexBox gap={'5px'} alignItems="center" width="198px">
                <CalendarToday sx={iconStyles} />
                <StyledTypography variant="body2">{`Created ${parsedDateValue} ago`}</StyledTypography>
            </FlexBox>
        </Tooltip>
    )
}

const ResolutionDue = (props: Pick<ITicketDetails, 'resolutionDue'>) => {
    return (
        <Tooltip title={`Resolution time: ${props.resolutionDue ? props.resolutionDue : '--'}`}>
            <FlexBox gap={'5px'} alignItems="center" width="198px">
                <AccessTime sx={iconStyles} />
                <StyledTypography variant="body2">{props.resolutionDue ? props.resolutionDue : '--'}</StyledTypography>
            </FlexBox>
        </Tooltip>
    )
}
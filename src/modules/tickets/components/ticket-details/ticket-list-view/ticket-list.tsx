import React from "react";
import { createSearchParams, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Avatar, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { ITicketDetails } from "modules/tickets/apis";
import { useAppDispatch } from "lib/hooks";
import { setTicketDetails } from "modules/tickets/storage";
import { useSourceIcon } from "../../display-tickets-grid";

interface ITicketListProps {
    data: ITicketDetails[];
    isLoading?: boolean;
}

const TickListWrapper = styled(FlexBox)`
    height: calc(100% - 65px);
    overflow: auto;
`;

const TicketWrapper = styled(FlexBox) <{ $isTicketActive: boolean }>`
    padding: 15px 10px 15px 15px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
    cursor: pointer;

    ${({ $isTicketActive }) => $isTicketActive && css`
        background-color: ${(props) => props.theme.pallete.purpleLight};
        border-left-width: 4px;
        border-style: solid;
        border-color: ${(props) => props.theme.pallete.primaryPurple};
        border-width: 0;
        border-left-width: thick;
    `}
`;

const TicketDetailsSectionRight = styled(FlexBox)`
    margin-left: 15px;
    width: calc(100% - 55px);
`;

const StyledTypography = styled(Typography)`
    && {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const TicketList = (props: ITicketListProps) => {
    const { data } = props;

    const ticketViewDetails = data.map((item) => (
        <TicketDetails {...item}
        />
    ));

    return (
        <TickListWrapper flexDirection="column">{ticketViewDetails}</TickListWrapper>
    )
};

interface ITicketDetailsProps extends ITicketDetails {
}

const TicketDetails = (props: ITicketDetailsProps) => {
    const { createdAt, customerName, ticketId, source, priority, ticketStatus, assigneeInfo, pastTickets,
        customerInfo, channelId, resolutionDue, responseDue, statusUpdateString, closedAt } = props;
    const params = useParams();
    const navigate = useNavigate();
    const match = useMatch(`/tickets/:ticketType/:ticketId`);
    const isTicketActive = React.useMemo(() => params.ticketId === ticketId, [params.ticketId, ticketId]);
    const ref = React.useRef<HTMLDivElement>(null);
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const dispatch = useAppDispatch();
    const getSourceIcon = useSourceIcon();

    React.useEffect(() => {
        if (params.ticketId === ticketId && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });

            dispatch(setTicketDetails({
                source,
                ticketId,
                customerName,
                ticketStatus,
                createdAt,
                priority,
                assigneeInfo,
                pastTickets,
                customerInfo,
                channelId,
                responseDue,
                resolutionDue,
                statusUpdateString,
                closedAt
            }));
        }
    }, [customerInfo, createdAt, customerName, dispatch, params.ticketId, priority, source, ticketId, ticketStatus,
        pastTickets, channelId, responseDue, resolutionDue, assigneeInfo, statusUpdateString, closedAt]);

    const onTicketClick = React.useCallback(() => {
        navigate(`/tickets/${match?.params.ticketType}/${ticketId}?${createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber! })}`);
    }, [match?.params.ticketType, navigate, noOfRecords, pageNumber, ticketId]);

    return (
        <TicketWrapper flexDirection="row" $isTicketActive={isTicketActive} ref={ref} onClick={onTicketClick}>
            <FlexBox justifyContent="center" alignItems="center">
                <Avatar />
            </FlexBox>
            <TicketDetailsSectionRight flexDirection="column" gap="6px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6">{customerName}</Typography>
                    <Typography variant="caption">{createdAt}</Typography>
                </FlexBox>
                <FlexBox flexDirection="row" gap="10px" alignItems="center">
                    <>
                        {getSourceIcon(source)}
                    </>
                    <StyledTypography variant="body2">Id: {ticketId}</StyledTypography>
                </FlexBox>
            </TicketDetailsSectionRight>
        </TicketWrapper>
    )
}
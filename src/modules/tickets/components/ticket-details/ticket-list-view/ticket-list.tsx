import React from "react";
import { createSearchParams, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Avatar, SxProps, Theme, Typography } from "@mui/material"
import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from "@mui/icons-material";
import { FlexBox } from "lib/ui-ux"
import { ITicketDetails } from "modules/tickets/apis";
import { getFormattedDate } from "lib/utils";
import { useAppDispatch } from "lib/hooks";
import { setTicketDetails } from "modules/tickets/storage";

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
        <TicketDetails createdAt={item.createdAt}
            customerName={item.customerName}
            priority={item.priority}
            ticketId={item.ticketId}
            source={item.source}
            ticketStatus={item.ticketStatus}
            ticketSubStatus={item.ticketSubStatus}
            key={item.ticketId}
            status={item.status}
            pastTickets={item.pastTickets}
            customerInfo={item.customerInfo} />
    ));

    return (
        <TickListWrapper flexDirection="column">{ticketViewDetails}</TickListWrapper>
    )
};

export const rendersourceIcon = (source: string, sx?: SxProps<Theme>) => {
    switch (source.toLocaleLowerCase()) {
        case 'facebook':
            return <Facebook sx={{ fill: '#3b5998 !important', ...sx }} />
        case 'email':
            return <Email sx={{ fill: '#df4b3a !important', ...sx }} />
        case 'whatsapp':
            return <WhatsApp sx={{ fill: '#25d366 !important', ...sx }} />
        case 'twitter':
            return <Twitter sx={{ fill: '#00acee !important', ...sx }} />
        case 'telephonic':
            return <LocalPhone sx={{ fill: '#00c2ff !important', ...sx }} />
        case 'instagram':
            return <Instagram sx={{ fill: '#d62976 !important', ...sx }} />
        case 'sms':
            return <Sms sx={{ fill: '#ffb800 !important', ...sx }} />
        default:
            return source;
    }
}

interface ITicketDetailsProps extends ITicketDetails {
}

const TicketDetails = (props: ITicketDetailsProps) => {
    const { createdAt, customerName, ticketId, source, priority, ticketStatus, ticketSubStatus, status, pastTickets, customerInfo } = props;
    const params = useParams();
    const navigate = useNavigate();
    const match = useMatch(`/tickets/:ticketType/:ticketId`);
    const isTicketActive = React.useMemo(() => params.ticketId === ticketId, [params.ticketId, ticketId]);
    const ref = React.useRef<HTMLDivElement>(null);
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (params.ticketId === ticketId && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });

            dispatch(setTicketDetails({
                source,
                ticketId,
                customerName,
                ticketStatus,
                ticketSubStatus,
                createdAt,
                priority,
                status,
                pastTickets,
                customerInfo
            }));
        }
    }, [customerInfo, createdAt, customerName, dispatch, params.ticketId, priority,
        source, status, ticketId, ticketStatus, ticketSubStatus, pastTickets]);

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
                    <Typography variant="caption">{getFormattedDate(createdAt)}</Typography>
                </FlexBox>
                <FlexBox flexDirection="row" gap="10px" alignItems="center">
                    <>
                        {rendersourceIcon(source)}
                    </>
                    <StyledTypography variant="body2">Id: {ticketId}</StyledTypography>
                </FlexBox>
            </TicketDetailsSectionRight>
        </TicketWrapper>
    )
}
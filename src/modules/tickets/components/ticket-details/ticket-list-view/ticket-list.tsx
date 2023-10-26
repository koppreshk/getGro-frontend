import React from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Avatar, Typography } from "@mui/material"
import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from "@mui/icons-material";
import { FlexBox } from "lib/ui-ux"
import { ITicketDetails } from "modules/tickets/apis";

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
    border-bottom: 1px solid #e9ebed;
    cursor: pointer;

    ${({ $isTicketActive }) => $isTicketActive && css`
        background-color: ${(props) => props.theme.pallete.powderBlue};
        border-right-width: 4px;
        border-style: solid;
        border-color: ${(props) => props.theme.pallete.blue};
        border-width: 0;
        border-right-width: thick;
    `}
`;

const TicketDetailsSectionRight = styled(FlexBox)`
    margin-left: 15px;
`;

export const TicketList = (props: ITicketListProps) => {
    const { data } = props;

    const ticketViewDetails = data.map((item) => (
        <TicketDetails createdDate={item.createdDate}
            customerName={item.customerName}
            priority={item.priority}
            ticketId={item.ticketId}
            source={item.source}
            ticketStatus={item.ticketStatus}
            ticketSubStatus={item.ticketSubStatus}
            key={item.ticketId} />
    ));

    return (
        <TickListWrapper $flexDirection="column">{ticketViewDetails}</TickListWrapper>
    )
};

const rendersourceIcon = (source: string) => {
    switch (source.toLocaleLowerCase()) {
        case 'facebook':
            return <Facebook sx={{ fill: '#3b5998 !important' }} />
        case 'email':
            return <Email sx={{ fill: '#df4b3a !important' }} />
        case 'whatsapp':
            return <WhatsApp sx={{ fill: '#25d366 !important' }} />
        case 'twitter':
            return <Twitter sx={{ fill: '#00acee !important' }} />
        case 'telephone':
            return <LocalPhone sx={{ fill: '#00c2ff !important' }} />
        case 'instagram':
            return <Instagram sx={{ fill: '#d62976 !important' }} />
        case 'sms':
            return <Sms sx={{ fill: '#ffb800 !important' }} />
        default:
            return source;
    }
}

interface ITicketDetailsProps extends Pick<ITicketDetails, 'source' | 'ticketId' | 'customerName' | 'ticketStatus' | 'ticketSubStatus' | 'createdDate' | 'priority'> {
}

const TicketDetails = (props: ITicketDetailsProps) => {
    const { createdDate, customerName, ticketId, source } = props;
    const params = useParams();
    const navigate = useNavigate();
    const match = useMatch(`/tickets/:ticketType/:ticketId`);
    const isTicketActive = React.useMemo(() => params.ticketId === ticketId, [params.ticketId, ticketId]);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (params.ticketId === ticketId && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [params.ticketId, ticketId]);

    const onTicketClick = React.useCallback(() => navigate(`/tickets/${match?.params.ticketType}/${ticketId}`), [match?.params.ticketType, navigate, ticketId]);

    return (
        <TicketWrapper $flexDirection="row" $isTicketActive={isTicketActive} ref={ref} onClick={onTicketClick}>
            <FlexBox $justifyContent="center" $alignItems="center">
                <Avatar />
            </FlexBox>
            <TicketDetailsSectionRight $flexDirection="column" $gap="6px">
                <FlexBox $justifyContent="space-between">
                    <Typography variant="h6" fontSize="16px">{customerName}</Typography>
                    <Typography variant="body2">{createdDate}</Typography>
                </FlexBox>
                <Typography variant="body2">Hellow victoria thak u for contacting...</Typography>
                <FlexBox $flexDirection="row" $gap="10px" $alignItems="center">
                    <>
                        {rendersourceIcon(source)}
                    </>
                    <Typography variant="body2">Id: {ticketId}</Typography>
                </FlexBox>
            </TicketDetailsSectionRight>
        </TicketWrapper>
    )
}
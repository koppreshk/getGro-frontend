import { Typography } from "@mui/material";
import styled from 'styled-components';
import { FlexBox } from "lib/ui-ux";
import { ITicketDetails } from "modules/tickets/apis"
import { rendersourceIcon } from "../../ticket-list-view";
import { getFormattedDate } from "lib/utils";
import { useLocation } from "react-router-dom";
import { CommonHeader } from "../common-header";

interface IPastTicketsLayoutProps {
    pastTickets: ITicketDetails[]
}

export const PastTicketsLayout = (props: IPastTicketsLayoutProps) => {
    const { pastTickets } = props;
    return (
        <>
            <PastTickets pastTickets={pastTickets} />
        </>
    )
}

const StyledContainer = styled(FlexBox)`
    background: #eef0ef;
    border-radius: 8px;
    padding: 8px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
        cursor: pointer;
    }
`;

const PastTickets = (props: IPastTicketsLayoutProps) => {
    const { pastTickets } = props;
    const { pathname, search } = useLocation();

    const onPastTicketClick = (ticketId: string) => {
        const pathNameParts = pathname.split('/');
        pathNameParts[3] = ticketId;
        window.open(`${pathNameParts.join('/')}${search}`);
    }

    return (
        <>
            <CommonHeader headerName="Past Tickets" />
            <FlexBox padding="8px" flexDirection="column" height="calc(100% - 72px)">
                {pastTickets.length ?
                    pastTickets.map((item, idx) => (
                        <StyledContainer key={idx} gap="10px" alignItems="center" onClick={() => onPastTicketClick(item.ticketId)}>
                            {rendersourceIcon(item.source, { width: '1.5em', height: '1.5em' })}
                            <FlexBox flexDirection="column" gap="5px">
                                <Typography variant="caption">{getFormattedDate(item.createdAt)}</Typography>
                                <Typography variant="caption">{item.ticketStatus}</Typography>
                                <Typography variant="body3">{item.ticketId}</Typography>
                            </FlexBox>
                        </StyledContainer>
                    ))
                    : (
                        <FlexBox alignItems="center" justifyContent="center" height="100%">
                            <Typography>No past tickets found</Typography>
                        </FlexBox>
                    )
                }
            </FlexBox>
        </>
    )
}
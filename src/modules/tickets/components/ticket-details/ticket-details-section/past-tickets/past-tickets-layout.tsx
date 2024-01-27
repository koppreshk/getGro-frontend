import { Typography } from "@mui/material";
import styled from 'styled-components';
import { FlexBox } from "lib/ui-ux";
import { ITicketDetails } from "modules/tickets/apis"
import { rendersourceIcon } from "../../ticket-list-view";
import { getFormattedDate } from "lib/utils";
import { StyledHeaderContainer } from "../dispose-ticket";
import { useLocation } from "react-router-dom";

interface IPastTicketsLayoutProps {
    pastTickets: ITicketDetails[]
}

export const PastTicketsLayout = (props: IPastTicketsLayoutProps) => {
    const { pastTickets } = props;
    return (
        <>
            {pastTickets.length
                ? <PastTickets pastTickets={pastTickets} />
                : <span>No Past tickets found</span>}
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
        let pathNameParts = pathname.split('/');
        pathNameParts[3] = ticketId;
        window.open(`${pathNameParts.join('/')}${search}`);
    }

    return (
        <>
            <StyledHeaderContainer alignItems="center">
                <Typography fontWeight="500">Past Tickets</Typography>
            </StyledHeaderContainer>
            <FlexBox padding="8px" flexDirection="column">
                {pastTickets.map((item, idx) => (
                    <StyledContainer key={idx} gap="10px" alignItems="center" onClick={() => onPastTicketClick(item.ticketId)}>
                        {rendersourceIcon(item.source, { width: '1.5em', height: '1.5em' })}
                        <FlexBox flexDirection="column" gap="5px">
                            <Typography variant="caption">{getFormattedDate(item.createdAt)}</Typography>
                            <Typography variant="caption">{item.ticketStatus}</Typography>
                            <Typography variant="body3">{item.ticketId}</Typography>
                        </FlexBox>
                    </StyledContainer>
                ))}
            </FlexBox>
        </>
    )
}
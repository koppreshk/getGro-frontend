import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { TicketConversationContainer, TicketListViewContainer } from "modules/tickets/containers"
import { TicketDetailsSection } from "./ticket-details-section/ticket-details-section";
import { useAppSelector } from "lib/hooks";
import { useFetchTicketById } from "modules/tickets/apis";

const StyledLayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
`;

const StyledLayouts = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
    border-left: ${({ theme }) => theme.semantics.standardBorder};
    transition: width 300ms;
`;

export const TicketDetailsLayout = () => {
    const showHideTicketDetails = useAppSelector((state) => state.tickets.showHideTicketDetails)
    const fetchTicketsData = useFetchTicketById();

    return (
        <StyledLayoutWrapper width="100%" height="100%" gap="20px">
            <StyledLayouts width="25%">
                <TicketListViewContainer />
            </StyledLayouts>
            <StyledLayouts width={!showHideTicketDetails ? "calc(75% - 96px)" : "calc(45% - 20px)"}>
                <TicketConversationContainer fetchTicketsAPIinfo={fetchTicketsData} />
            </StyledLayouts>
            <StyledLayouts width={!showHideTicketDetails ? "52px" : "calc(30% - 20px)"}>
                <TicketDetailsSection tagData={fetchTicketsData.data?.tags || []} dispositonData={fetchTicketsData.data?.dispositions || []} queuesData={fetchTicketsData.data?.queues || []} />
            </StyledLayouts>
        </StyledLayoutWrapper>
    )
}
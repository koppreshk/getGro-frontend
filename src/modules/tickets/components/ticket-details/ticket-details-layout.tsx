import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { TicketListViewContainer } from "modules/tickets/containers"
import { TicketDetailsSection } from "./ticket-details-section/ticket-details-section";
import { useAppSelector } from "lib/hooks";
import { useFetchTicketById } from "modules/tickets/apis";
import { TicketConversationLayout } from "./ticket-conversation";

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
    const fetchTicketsAPIinfo = useFetchTicketById();

    return (
        <StyledLayoutWrapper width="100%" height="100%" gap="20px">
            <StyledLayouts width="25%">
                <TicketListViewContainer />
            </StyledLayouts>
            <StyledLayouts width={!showHideTicketDetails ? "calc(75% - 96px)" : "calc(45% - 20px)"}>
                <TicketConversationLayout />
            </StyledLayouts>
            <StyledLayouts width={!showHideTicketDetails ? "52px" : "calc(30% - 20px)"}>
                <TicketDetailsSection tagData={fetchTicketsAPIinfo.data?.tags || []} dispositonData={fetchTicketsAPIinfo.data?.dispositions || []} queuesData={fetchTicketsAPIinfo.data?.queues || []} />
            </StyledLayouts>
        </StyledLayoutWrapper>
    )
}
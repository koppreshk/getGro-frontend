import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { TicketConversationContainer, TicketListViewContainer } from "modules/tickets/containers"
import { TicketDetailsSection } from "./ticket-details-section/ticket-details-section";

const StyledLayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
`;

const StyledLayouts = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
    border-left: ${({ theme }) => theme.semantics.standardBorder};
`;

export const TicketDetailsLayout = () => {
    return (
        <StyledLayoutWrapper $width="100%" $height="100%" $gap="20px">
            <StyledLayouts $width="25%">
                <TicketListViewContainer />
            </StyledLayouts>
            <StyledLayouts $width="calc(45% - 20px)">
                <TicketConversationContainer />
            </StyledLayouts>
            <StyledLayouts $width="calc(30% - 20px)">
                <TicketDetailsSection />
            </StyledLayouts>
        </StyledLayoutWrapper>
    )
}
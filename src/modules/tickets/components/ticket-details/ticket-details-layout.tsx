import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { TicketConversationContainer, TicketListViewContainer } from "modules/tickets/containers"
import { TicketDeatilsTabLayout } from "./ticket-details-section";

const StyledLayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
`;

export const TicketDetailsLayout = () => {
    return (
        <StyledLayoutWrapper $width="100%" $height="100%" $gap="20px">
            <FlexBox $width="25%" style={{ borderRight: '1px solid #e9ebed' }}>
                <TicketListViewContainer />
            </FlexBox>
            <FlexBox $width="calc(40% - 20px)" style={{ borderRight: '1px solid #e9ebed' }}>
                <TicketConversationContainer />
            </FlexBox>
            <FlexBox $width="calc(35% - 20px)">
                <TicketDeatilsTabLayout />
            </FlexBox>
        </StyledLayoutWrapper>
    )
} 
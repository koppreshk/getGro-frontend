import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { TicketConversation } from "./ticket-conversation";
import { ITicketConversation } from "modules/tickets/apis";

export interface ITicketConversationLayoutProps {
    data: ITicketConversation;
    isLoading?: boolean;
}

const LayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const TicketConversationLayout = (props: ITicketConversationLayoutProps) => {
    return (
        <LayoutWrapper $width="100%" $flexDirection="column">
            <TicketConversationHeader />
            <TicketConversation data={props.data} isLoading={props.isLoading} />
        </LayoutWrapper>
    )
}
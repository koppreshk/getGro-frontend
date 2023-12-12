import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { TicketConversation } from "./ticket-conversation";
import { ITicketConversation, ITicketDetails } from "modules/tickets/apis";
import { EmailConversationLayout } from "./email-conversations/email-conversations-layout";

export interface ITicketConversationLayoutProps {
    data: ITicketConversation;
    isLoading?: boolean;
    ticketDetailsById?: ITicketDetails;
}

const LayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const TicketConversationLayout = (props: ITicketConversationLayoutProps) => {
    const { ticketDetailsById } = props;
    return (
        <LayoutWrapper $width="100%" $flexDirection="column">
            <TicketConversationHeader ticketDetailsById={ticketDetailsById} />

            {ticketDetailsById && ticketDetailsById.source.toLocaleLowerCase() === 'email' ?
                <EmailConversationLayout />
                : <TicketConversation data={props.data} isLoading={props.isLoading} />}
        </LayoutWrapper>
    )
}
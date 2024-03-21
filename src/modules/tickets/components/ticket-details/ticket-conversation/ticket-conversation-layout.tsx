import React from "react";
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { TelephonicConversationsLayout } from "./telephonic-conversations/telephonic-conversations";
import { useAppSelector } from "lib/hooks";
import { TicketConversationContainer, WhatsAppConversationContainer } from "modules/tickets/containers";

export interface ITicketConversationLayoutProps {
}

const LayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const TicketConversationLayout = (props: ITicketConversationLayoutProps) => {
    const ticketDetailsById = useAppSelector(state => state.tickets.ticketDetails);
    const ticketSource = ticketDetailsById && ticketDetailsById.source?.toLocaleLowerCase();

    const renderConversation = React.useCallback(() => {
        switch (ticketSource) {
            case 'email':
                return <TicketConversationContainer />
            case 'telephonic':
                return <TelephonicConversationsLayout />;
            case 'whatsapp':
                return <WhatsAppConversationContainer />
            default:
                return <></>
        }
    }, [ticketSource]);

    return (
        <LayoutWrapper width="100%" flexDirection="column">
            <TicketConversationHeader ticketDetailsById={ticketDetailsById!} />
            <div style={{ height: 'calc(100% - 73px)' }}>
                {renderConversation()}
            </div>
        </LayoutWrapper>
    )
}
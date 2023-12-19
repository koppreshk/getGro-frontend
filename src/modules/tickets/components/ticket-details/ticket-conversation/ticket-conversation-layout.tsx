import React from "react";
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { TicketConversation } from "./ticket-conversation";
import { ITicketConversation, ITicketDetails } from "modules/tickets/apis";
import { EmailConversationLayout } from "./email-conversations/email-conversations-layout";
import { TelephonicConversationsLayout } from "./telephonic-conversations/telephonic-conversations";

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
    const ticketSource = ticketDetailsById && ticketDetailsById.source.toLocaleLowerCase();

    const renderConversation = React.useCallback(() => {
        switch (ticketSource) {
            case 'email':
                return <EmailConversationLayout />;
            case 'telephonic':
                return <TelephonicConversationsLayout />;

            default:
                return <TicketConversation data={props.data} isLoading={props.isLoading} />
        }
    }, [props.data, props.isLoading, ticketSource]);
    
    return (
        <LayoutWrapper $width="100%" $flexDirection="column">
            <TicketConversationHeader ticketDetailsById={ticketDetailsById} />
            {renderConversation()}
        </LayoutWrapper>
    )
}
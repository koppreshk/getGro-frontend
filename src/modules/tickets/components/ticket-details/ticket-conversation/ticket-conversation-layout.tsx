import React from "react";
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { TicketConversation } from "./ticket-conversation";
import { ITicketById, ITicketConversation } from "modules/tickets/apis";
import { EmailConversationLayout } from "./email-conversations/email-conversations-layout";
import { TelephonicConversationsLayout } from "./telephonic-conversations/telephonic-conversations";
import { useAppSelector } from "lib/hooks";

export interface ITicketConversationLayoutProps {
    data: ITicketConversation;
    conversationsData?: ITicketById;
    isLoading?: boolean;
}

const LayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const TicketConversationLayout = (props: ITicketConversationLayoutProps) => {
    const { conversationsData } = props;
    const ticketDetailsById = useAppSelector(state => state.tickets.ticketDetails);
    const ticketSource = ticketDetailsById && ticketDetailsById.source?.toLocaleLowerCase();

    const renderConversation = React.useCallback(() => {
        switch (ticketSource) {
            case 'email':
                return conversationsData ? <EmailConversationLayout conversationsData={conversationsData} /> : null;
            case 'telephonic':
                return <TelephonicConversationsLayout />;
            default:
                return <TicketConversation data={props.data} isLoading={props.isLoading} />
        }
    }, [conversationsData, props.data, props.isLoading, ticketSource]);

    return (
        <LayoutWrapper width="100%" flexDirection="column">
            <TicketConversationHeader ticketDetailsById={ticketDetailsById!} />
            <div style={{ height: 'calc(100% - 73px)' }}>
                {renderConversation()}
            </div>
        </LayoutWrapper>
    )
}
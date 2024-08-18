import React from "react";
import { CustomTabPanel, FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { useAppSelector } from "lib/hooks";
import {
    FacebookConversationsContainer,
    InstagramConversationsContainer,
    TelephonicConversationContainer,
    EmailConversationContainer,
    WhatsAppConversationContainer
} from "modules/tickets/containers";
import { Tabs, Tab } from "@mui/material";

const StyledTab = styled(Tab)`
    &&{
        padding: 12px 10px;
        min-height: unset;
        text-transform: unset;
    }
`;

export interface ITicketConversationLayoutProps {
}

const LayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const TicketConversationLayout = () => {
    const ticketDetailsById = useAppSelector(state => state.tickets.ticketDetails);
    const ticketSource = ticketDetailsById && ticketDetailsById.source?.toLocaleLowerCase();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const renderConversations = React.useCallback(() => {
        switch (ticketSource) {
            case 'email':
                return <EmailConversationContainer />
            case 'telephonic':
                return <TelephonicConversationContainer />
            case 'whatsapp':
                return <WhatsAppConversationContainer />
            case 'instagram':
                return <InstagramConversationsContainer />
            case 'facebook':
                return <FacebookConversationsContainer />
            default:
                return <></>
        }
    }, [ticketSource]);

    return (
        <LayoutWrapper width="100%" flexDirection="column">
            <TicketConversationHeader ticketDetailsById={ticketDetailsById!} />
            <Tabs value={value} onChange={handleChange} aria-label="ticket-tabs" sx={{ minHeight: 'unset' }}>
                <StyledTab label="Conversations" />
                <StyledTab label="Links" />
                <StyledTab label="History" />
            </Tabs>
            <div style={{ height: 'calc(100% - 114px)' }}>
                <CustomTabPanel value={value} index={0} height="100%">
                    {renderConversations()}
                </CustomTabPanel>
            </div>
        </LayoutWrapper>
    )
}
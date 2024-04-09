import React from "react";
import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { useFetchWhatsAppMessages } from "../apis";
import { TicketConversation } from "../components/ticket-details/ticket-conversation/ticket-conversation";
import { FlexBox } from "lib/ui-ux";
import { useSocket } from "lib/providers/socket";

export const WhatsAppConversationContainer = () => {
    const { isLoading, data, refetch } = useFetchWhatsAppMessages();
    const { socket } = useSocket();

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        socket.on('production_whatsapp_channel', (_info) => {
            //TODO: need to use this info obj which contains id and has to be consumed
            refetch();
        })
        return () => {
            socket.off('production_whatsapp_channel')
        }
    }, [refetch, socket])

    if (isLoading) {
        return (
            <FlexBox width="100%" height="100%" flexDirection="column" padding="10px">
                <ChatConversationLoader />
            </FlexBox>
        )
    }

    return (
        <>
            <TicketConversation data={data!} />
        </>
    )
}
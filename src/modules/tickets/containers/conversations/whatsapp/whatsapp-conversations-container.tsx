import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { useFetchWhatsAppMessages } from "../../../apis";
import { FlexBox } from "lib/ui-ux";
// import { useSocket } from "lib/providers/socket";
import { WhatsAppConversations } from "../../../components/ticket-details/ticket-conversation/whatsapp-conversations";
import { Alert } from "@mui/material";

export const WhatsAppConversationContainer = () => {
    const { isLoading, data, isError } = useFetchWhatsAppMessages();
    // const { socket } = useSocket();

    // React.useEffect(() => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     socket.on('production_whatsapp_channel', (_info) => {
    //         //TODO: need to use this info obj which contains id and has to be consumed
    //         refetch();
    //     })
    //     return () => {
    //         socket.off('production_whatsapp_channel')
    //     }
    // }, [refetch, socket])

    if (isLoading) {
        return (
            <FlexBox width="100%" height="100%" flexDirection="column" padding="10px">
                <ChatConversationLoader />
            </FlexBox>
        )
    }

    //Temp code, should be removed!
    if (data?.agent_name === undefined || isError) {
        return (
            <FlexBox alignItems="center" justifyContent="center" width="100%" height="100%">
                <Alert sx={{ height: 'fit-content' }} severity="error">There was an error while fetching the data, please retry later</Alert>
            </FlexBox>
        )
    }

    return (
        <>
            <WhatsAppConversations data={data!} />
        </>
    )
}
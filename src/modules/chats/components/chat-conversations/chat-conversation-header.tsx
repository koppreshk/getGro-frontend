import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import { useTheme } from "styled-components"
import { ChatConversationById } from "modules/chats/apis"
import { useAppSelector } from "lib/hooks"

interface ChatConversationHeaderProps extends Pick<ChatConversationById, 'profile_name' | 'profile_number'> {

}

const getParsedChatType = (chatType: string) => {
    switch (chatType) {
        case 'instagram_comment':
            return <span>Commented on <b>instagram</b> post</span>;
        case 'instagram_message':
            return <span>Messaged on <b>instagram</b></span>;
        case 'fb_page_message':
            return <span>Messaged on <b>facebook</b></span>
        default: return chatType.split('_').join(' ')
    }
}

export const ChatConversationHeader = (props: ChatConversationHeaderProps) => {
    const { profile_number } = props;
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    return (
        <FlexBox gap={'10px'} padding="15px 10px" height="" alignItems="center">
            <CustomSourceAvatar customer_name={chatDetails?.customer_name ?? ''} chat_source={chatDetails?.chat_source ?? ''} chat_type={chatDetails?.chat_type ?? ''} />
            <ChatSubHeading profileNumber={profile_number} />
        </FlexBox>
    )
}

export const ChatSubHeading = (props: { profileNumber: string }) => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);
    const { pallete } = useTheme();

    return (
        <FlexBox flexDirection="column">
            <Typography variant="h6">{chatDetails?.customer_name}</Typography>
            {chatDetails?.chat_source === 'whatsapp'
                ? <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>{props.profileNumber}</Typography>
                : <Typography variant="body3" sx={{ color: pallete.grayNeutral }}> {chatDetails?.chat_type ? getParsedChatType(chatDetails.chat_type) : null}</Typography>
            }
        </FlexBox>
    )
}
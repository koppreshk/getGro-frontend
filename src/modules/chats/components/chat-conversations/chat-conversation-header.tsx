import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import { useTheme } from "styled-components"
import { ChatConversationById } from "modules/chats/apis"

interface ChatConversationHeaderProps extends Pick<ChatConversationById, 'profile_name' | 'profile_number'> {

}
export const ChatConversationHeader = (props: ChatConversationHeaderProps) => {
    const { profile_name, profile_number } = props;
    const { pallete } = useTheme();

    return (
        <FlexBox gap={'10px'} padding="0 0 0 8px" height="54px" alignItems="center">
            <CustomSourceAvatar customer_name="Sanjay" chat_source="whatsapp" />
            <FlexBox flexDirection="column">
                <Typography variant="h6">{profile_name}</Typography>
                <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>{profile_number}</Typography>
            </FlexBox>
        </FlexBox>
    )
}
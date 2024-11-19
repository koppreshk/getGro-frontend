import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import styled, { useTheme } from "styled-components"
import { ChatConversationById } from "modules/chats/apis"
import { useAppSelector } from "lib/hooks"
import { Platform } from "../chat-details/chat-details"

const StyledPlatform = styled(Platform)`
    text-transform: capitalize;
`;

interface ChatConversationHeaderProps extends Pick<ChatConversationById, 'profile_name' | 'profile_number'> {

}
export const ChatConversationHeader = (props: ChatConversationHeaderProps) => {
    const { profile_name, profile_number } = props;
    const { pallete } = useTheme();
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    return (
        <FlexBox gap={'10px'} padding="15px 10px" height="" alignItems="center">
            <CustomSourceAvatar customer_name={chatDetails?.customer_name ?? ''} chat_source={chatDetails?.chat_source ?? ''} />
            <FlexBox flexDirection="column">
                <Typography variant="h6">{profile_name}</Typography>
                <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>{profile_number}</Typography>
                <FlexBox gap="5px">
                    <Typography variant="body2">
                        <span>via</span>
                    </Typography>
                    <StyledPlatform variant="body2" $platform={chatDetails?.chat_source.toLocaleLowerCase() ?? ''}>
                        {chatDetails?.chat_type ? chatDetails.chat_type.split('_').join(' ') : null}
                    </StyledPlatform>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}
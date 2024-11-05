import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import { useTheme } from "styled-components"

export const ChatConversationHeader = () => {
    const { pallete } = useTheme();

    return (
        <FlexBox gap={'10px'} padding="0 0 0 8px" height="54px" alignItems="center">
            <CustomSourceAvatar customer_name="Sanjay" chat_source="whatsapp" />
            <FlexBox flexDirection="column">
                <Typography variant="h6">Sanjay</Typography>
                <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>{'919535016465'}</Typography>
            </FlexBox>
        </FlexBox>
    )
}
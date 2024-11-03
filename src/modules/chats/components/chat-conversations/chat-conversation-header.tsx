import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"

export const ChatConversationHeader = () => {
    return (
        <FlexBox gap={'10px'} padding="0 0 0 8px" height="54px" alignItems="center">
            <CustomSourceAvatar />
            <FlexBox flexDirection="column">
                <Typography variant="h6">Sanjay</Typography>
                <Typography variant="body3">{'919535016465'}</Typography>
            </FlexBox>
        </FlexBox>
    )
}
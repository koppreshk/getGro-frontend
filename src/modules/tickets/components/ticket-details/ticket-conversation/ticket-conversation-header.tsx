import { Typography } from "@mui/material"
import { HeaderWrapper } from "../ticket-list-view"

export const TicketConversationHeader = () => {
    return (
        <HeaderWrapper $width="100%" $height="64px">
            <Typography variant="h6">Conversations</Typography>
        </HeaderWrapper>
    )
}
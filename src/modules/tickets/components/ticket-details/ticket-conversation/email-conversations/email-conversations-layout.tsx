import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations } from "./email-conversations";

const LayoutWrapper = styled(FlexBox)`
    padding: 15px 10px;
`;

export const EmailConversationLayout = () => {
    return (
        <LayoutWrapper $flexDirection="column">
            <Typography variant="h5">Subject goes here</Typography>
            <EmailConversations />
        </LayoutWrapper>
    )
}
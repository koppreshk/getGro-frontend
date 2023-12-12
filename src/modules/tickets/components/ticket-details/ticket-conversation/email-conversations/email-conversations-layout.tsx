import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations } from "./email-conversations";

const LayoutWrapper = styled(FlexBox)`
    padding: 15px 10px;
`;

export const EmailConversationLayout = () => {
    return (
        <LayoutWrapper $flexDirection="column" $gap="10px" $width="100%" $height="calc(100% - 84px);">
            <Typography variant="h5">Subject: My order is delayed</Typography>
            <EmailConversations />
        </LayoutWrapper>
    )
}
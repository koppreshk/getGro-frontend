import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations } from "./email-conversations";

const LayoutWrapper = styled(FlexBox)`
    padding: 15px 10px;
`;

export const EmailConversationLayout = () => {
    const subject = 'My order is delayed';
    return (
        <LayoutWrapper $flexDirection="column" $gap="10px" $width="100%" $height="calc(100% - 84px);">
            <Typography variant="h5">Subject: {subject}</Typography>
            <EmailConversations subject={subject} />
        </LayoutWrapper>
    )
}
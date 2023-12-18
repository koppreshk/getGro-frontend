import { useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations } from "./email-conversations";
import { UnfoldMore, UnfoldLess } from '@mui/icons-material';

const LayoutWrapper = styled(FlexBox)`
    padding: 15px 10px;
`;

export const EmailConversationLayout = () => {
    const subject = 'My order is delayed';
    const [isCollapsedAll, setAllCollapsed] = useState(true);

    const toggleCollapse = () => setAllCollapsed(!isCollapsedAll);

    return (
        <LayoutWrapper $flexDirection="column" $gap="10px" $width="100%" $height="calc(100% - 84px);">
            <FlexBox $justifyContent="space-between">
                <Typography variant="h5">Subject: {subject}</Typography>
                <Tooltip title={isCollapsedAll ? 'Expand all' : 'Collapse all'}>
                    <IconButton>
                        {isCollapsedAll ? <UnfoldMore onClick={toggleCollapse} /> : <UnfoldLess onClick={toggleCollapse} />}
                    </IconButton>
                </Tooltip>
            </FlexBox>
            <EmailConversations subject={subject} isCollapsedAll={isCollapsedAll} />
        </LayoutWrapper>
    )
}
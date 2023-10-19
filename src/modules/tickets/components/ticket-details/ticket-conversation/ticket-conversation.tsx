import React from "react";
import styled from "styled-components";
import { Send } from "@mui/icons-material";
import { Avatar, Button, Tab, Tabs, Typography } from "@mui/material";
import { FlexBox, TextArea } from "lib/ui-ux";
import { ITicketConversation } from "modules/tickets/apis";
import { ITicketConversationLayoutProps } from "./ticket-conversation-layout";

const Content = styled(FlexBox) <{ $isCustomerQuery: boolean }>`
    background-color: ${({ theme, $isCustomerQuery }) => $isCustomerQuery ? '#ffefe0' : theme.pallete.white};
    padding: 10px;
    border-radius: ${({ $isCustomerQuery }) => $isCustomerQuery ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};
`;

const Container = styled(FlexBox)`
    background-color: #f5f7f9;
    padding: 10px;
`;

export const TicketConversation = (props: Pick<ITicketConversationLayoutProps, 'data'>) => {
    const { data } = props;
    return (
        <FlexBox $height="calc(100% - 64px);" $flexDirection="column" $gap="10px">
            <Container $height="calc(80% - 10px)" $flexDirection="column" $gap="10px">
                {data.map((item, index) => <ChatContent key={index} content={item} />)}
            </Container>
            <Footer />
        </FlexBox>
    );
}

const ChatContent = (props: { content: ITicketConversation }) => {
    const { content } = props;
    const isCustomerQuery = content.custumerQuery !== undefined;
    const query = content.custumerQuery ? content.custumerQuery : content.agentQuery;

    return (
        <FlexBox $gap="10px" $alignItems="center" $flexDirection={isCustomerQuery ? 'row' : 'row-reverse'}>
            <Avatar />
            <Content $isCustomerQuery={isCustomerQuery} $maxWidth="50%">
                <Typography variant="body2">
                    {query}
                </Typography>
            </Content>
        </FlexBox>
    )
}

const Footer = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <FlexBox $flexDirection="column">
            <Tabs value={value} onChange={handleChange} aria-label="Tabs footer content">
                <Tab label="Reply" id="reply-tab" />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <TextArea />
                <FlexBox $justifyContent="flex-end" $padding="0px 10px">
                    <Button variant="contained" endIcon={<Send />}>
                        Send
                    </Button>
                </FlexBox>
            </CustomTabPanel>
        </FlexBox>
    )
}

function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}
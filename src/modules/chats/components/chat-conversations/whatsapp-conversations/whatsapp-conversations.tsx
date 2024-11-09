import React, { useMemo } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { ConversationContainerBackground, FlexBox } from "lib/ui-ux";
import { isToday, isYesterday } from "lib/utils";
import { ChatConversationById, Message, useSendChatReply } from "modules/chats/apis";
import { WhatsappFooter } from "./whatsapp-footer";
import { WhatsAppChatContent } from "./whatsapp-chat-content";

const DateText = styled(Typography)`
    background: #fffffff2;
    color: ${({ theme }) => theme.pallete.grayVariant2};
    padding: 5px 12px 6px 12px;
    border-radius: 6px;
    width: fit-content;
`;

interface WhatsAppConversationsProps {
    conversationId: string;
    data: ChatConversationById;
}

export const WhatsAppConversations = (props: WhatsAppConversationsProps) => {
    const { data, conversationId } = props;
    const [chatData, setChatData] = React.useState(data.messages);
    const { mutateAsync } = useSendChatReply();

    React.useEffect(() => {
        setChatData(data.messages);
    }, [data.messages]);

    const onSendAction = React.useCallback((newConversation: { message: string; mediaURL?: string, type?: string, caption?: string, filename?: string }) => {
        const { message, mediaURL, type, caption, filename } = newConversation;
        setChatData((prevValue) => ([...prevValue, {
            created_at: new Date().toISOString(),
            caption: '',
            direction: 'outgoing',
            replied_by: 'agent',
            message: message,
            status: 'pending',
            message_type: 'text'
        }]))
        return mutateAsync({
            conversation_id: conversationId,
            message_type: "text",
            message: message,
            chat_type: "whatsapp",
            media_url: mediaURL,
            caption: caption,
            filename: filename,
            mime_type: type
        })
    }, [mutateAsync, conversationId])

    // Group messages by date
    const groupedMessages = useMemo(() => chatData.reduce((acc, message) => {
        // Extract just the date portion (YYYY-MM-DD) from `created_at`
        const date = new Date(message.created_at).toISOString().split('T')[0];

        // Initialize the group if it doesn't exist
        if (!acc[date]) {
            acc[date] = [];
        }

        // Push the current message into the corresponding date group
        acc[date].push(message);

        return acc;
    }, {} as Record<string, Message[]>), [chatData]);

    return (
        <ConversationContainerBackground style={{ width: '100%', height: 'calc(100% - 54px)' }}>
            <FlexBox height="100%" flexDirection="column">
                <FlexBox height="calc(100% - 157px)" maxHeight="calc(100% - 157px)" flexDirection="column" overflowY="auto" gap="10px" padding="10px">
                    {
                        Object.keys(groupedMessages).map((date) => {
                            return (
                                <React.Fragment key={date}>
                                    <FlexBox justifyContent="center">
                                        <DateText variant="subheading2">{isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : date}</DateText>
                                    </FlexBox>
                                    {groupedMessages[date]?.map((item, index) => (
                                        <WhatsAppChatContent
                                            key={index}
                                            content={item}
                                            customerName={data.profile_name} />
                                    ))}
                                </React.Fragment>
                            )
                        }
                        )
                    }
                </FlexBox>
                <WhatsappFooter onSendAction={onSendAction} />
            </FlexBox>
        </ConversationContainerBackground>
    );
}

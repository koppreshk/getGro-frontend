import React, { useMemo } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { ConversationContainerBackground, FlexBox } from "lib/ui-ux";
import { isToday, isYesterday } from "lib/utils";
import { ChatConversationById, Message, MessageType, useSendChatReply } from "modules/chats/apis";
import { WhatsappFooter } from "./whatsapp-footer";
import { WhatsAppChatContent } from "./whatsapp-chat-content";
import { useAppSelector } from "lib/hooks";
import { DateTime } from "luxon";

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

function getFileType(mimeType: string): MessageType {
    if (mimeType.startsWith("image/")) {
        return "image";
    } else if (mimeType.startsWith("video/")) {
        return "video";
    } else if (mimeType.startsWith("audio/")) {
        return "audio";
    } else if (
        mimeType === "application/pdf" ||
        mimeType === "application/msword" ||
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        mimeType === "application/vnd.ms-excel" ||
        mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        mimeType === "application/vnd.ms-powerpoint" ||
        mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        mimeType === "text/plain" ||
        mimeType === "application/json"
    ) {
        return "document";
    } else {
        return "document";
    }
}

export const WhatsAppConversations = (props: WhatsAppConversationsProps) => {
    const { data, conversationId } = props;
    const [chatData, setChatData] = React.useState(data.messages);
    const { mutateAsync } = useSendChatReply();
    const chatDetails = useAppSelector((state) => state.chat.chatDetails)

    React.useEffect(() => {
        setChatData(data.messages);
    }, [data.messages]);


    const onSendAction = React.useCallback((newConversation: { message: string; mediaURL?: string, type?: string, caption?: string, filename?: string }) => {
        const { message, mediaURL, type, caption, filename } = newConversation;
        setChatData((prevValue) => ([...prevValue, {
            created_at: DateTime.local().toFormat("yyyy-MM-dd hh:mm a"),
            caption: '',
            direction: 'outgoing',
            replied_by: 'agent',
            message: message,
            status: 'pending',
            message_type: mediaURL ? getFileType(type!) : "text",
            media_url: mediaURL,
            mime_type: type
        }]))
        return mutateAsync({
            conversation_id: conversationId,
            message_type: mediaURL ? getFileType(type!) : "text",
            message: message,
            chat_type: chatDetails!.chat_source,
            media_url: mediaURL,
            caption: caption,
            filename: filename,
            mime_type: type
        })
    }, [mutateAsync, conversationId, chatDetails])

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

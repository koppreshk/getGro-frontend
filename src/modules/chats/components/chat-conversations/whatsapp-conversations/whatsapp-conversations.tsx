import React, { useMemo } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { ConversationContainerBackground, FlexBox } from "lib/ui-ux";
import { isToday, isYesterday } from "lib/utils";
import { ChatConversationById, Message } from "modules/chats/apis";
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
    isDisabled?: boolean;
    data: ChatConversationById;
}

export const WhatsAppConversations = (props: WhatsAppConversationsProps) => {
    const { data, isDisabled } = props;
    const [chatData, setChatData] = React.useState(data.messages);
    // const { mutateAsync } = useSendWhatsAppMessages();

    React.useEffect(() => {
        setChatData(data.messages);
    }, [data.messages]);

    const onSendAction = React.useCallback((newConversation: { message: string; fileUrl?: string, type: string }) => {
        console.log(newConversation);
        // setChatData((prevValue) => ([...prevValue, {
        //     created_at: new Date().toISOString(),
        //     delivered: false,
        //     is_agent_sent: true,
        //     message: newConversation.message,
        //     message_id: '',
        //     read: false,
        //     file_url: newConversation.fileUrl,
        //     message_type: newConversation.type
        // }]))
        // mutateAsync({
        //     messageId: chatData[chatData.length - 1].message_id,
        //     message: newConversation.message,
        //     fileUrl: newConversation.fileUrl,
        //     type: newConversation.type
        // })
    }, [])

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
        <ConversationContainerBackground style={{ width: '100%', height: 'calc(100% - 54px)',position: 'relative' }}>
            <FlexBox height="calc(100% - 200px)" flexDirection="column" overflowY="auto" gap="10px" padding="10px">
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
            <WhatsappFooter onSendAction={onSendAction} isDisabled={isDisabled} />
        </ConversationContainerBackground>
    );
}

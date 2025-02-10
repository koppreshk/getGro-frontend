import { Typography } from '@mui/material';
import { useAppSelector, useFeature } from 'lib/hooks';
import { ConversationContainerBackground, FlexBox } from 'lib/ui-ux';
import { isToday, isYesterday } from 'lib/utils';
import { DateTime } from 'luxon';
import {
  ChatConversationById,
  Message,
  MessageType,
  useSendChatReply,
} from 'modules/chats/apis';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { ChatContent } from './chat-content';
import { ConversationFooter } from './conversation-footer';

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
  if (mimeType.startsWith('image/')) {
    return 'image';
  } else if (mimeType.startsWith('video/')) {
    return 'video';
  } else if (mimeType.startsWith('audio/')) {
    return 'audio';
  } else if (
    mimeType === 'application/pdf' ||
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/vnd.ms-excel' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimeType === 'application/vnd.ms-powerpoint' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    mimeType === 'text/plain' ||
    mimeType === 'application/json'
  ) {
    return 'document';
  } else {
    return 'document';
  }
}

export const ConversationsWrapper = (props: WhatsAppConversationsProps) => {
  const { data, conversationId } = props;
  const [chatData, setChatData] = React.useState(data.messages);
  const { mutateAsync } = useSendChatReply();
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const user = useAppSelector((state) => state.core.config);

  React.useEffect(() => {
    setChatData(data.messages);
  }, [data.messages]);

  const onSendAction = React.useCallback(
    (newConversation: {
      message: string;
      mediaURL?: string;
      type?: string;
      caption?: string;
      filename?: string;
    }) => {
      const { message, mediaURL, type, caption, filename } = newConversation;
      setChatData((prevValue) => [
        ...prevValue,
        {
          created_at: DateTime.local().toFormat('yyyy-MM-dd hh:mm a'),
          caption: caption ?? '',
          direction: 'outgoing',
          replied_by: user?.user_details.full_name ?? 'agent',
          message: message,
          status: 'pending',
          message_type: mediaURL ? getFileType(type!) : 'text',
          media_url: mediaURL,
          mime_type: type,
        },
      ]);
      return mutateAsync({
        conversation_id: conversationId,
        message_type: mediaURL ? getFileType(type!) : 'text',
        message: message,
        chat_type: chatDetails!.chat_source,
        media_url: mediaURL,
        caption: caption,
        filename: filename,
        mime_type: type,
      });
    },
    [mutateAsync, conversationId, chatDetails, user?.user_details.full_name]
  );

  // Group messages by date
  const groupedMessages = useMemo(
    () =>
      chatData.reduce((acc: { [key: string]: Message[] }, message) => {
        // Parse the date string using luxon
        const parsedDate = DateTime.fromFormat(
          message.created_at,
          'yyyy-MM-dd hh:mm a'
        );

        // Format the date to just the date portion (YYYY-MM-DD)
        const date = parsedDate.toFormat('yyyy-MM-dd');

        // Initialize the group if it doesn't exist
        if (!acc[date]) {
          acc[date] = [];
        }

        // Push the current message into the corresponding date group
        acc[date].push(message);

        return acc;
      }, {}),
    [chatData]
  );

  const isReplyFeatureAccessible = useFeature('reply_conversation');
  const { t } = useTranslation();
  return (
    <ConversationContainerBackground
      style={{ width: '100%', height: 'calc(100% - 72px)' }}
    >
      <FlexBox height="100%" flexDirection="column">
        <FlexBox
          height="calc(100% - 157px)"
          maxHeight="calc(100% - 157px)"
          flexDirection="column"
          overflowY="auto"
          gap="10px"
          padding="10px"
        >
          {Object.keys(groupedMessages).map((date) => {
            return (
              <React.Fragment key={date}>
                <FlexBox justifyContent="center">
                  <DateText variant="subheading2">
                    {isToday(date)
                      ? t('today')
                      : isYesterday(date)
                        ? t('yesterday')
                        : date}
                  </DateText>
                </FlexBox>
                {groupedMessages[date]?.map((item, index) => (
                  <ChatContent
                    key={index}
                    content={item}
                    customerName={data.profile_name}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </FlexBox>
        {isReplyFeatureAccessible ? (
          <ConversationFooter
            onSendAction={onSendAction}
            is_expired={data.is_expired}
          />
        ) : null}
      </FlexBox>
    </ConversationContainerBackground>
  );
};

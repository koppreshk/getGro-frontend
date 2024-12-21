import { Typography } from '@mui/material';
import { ConversationContainerBackground, FlexBox } from 'lib/ui-ux';
import { isToday, isYesterday } from 'lib/utils';
import {
  Conversation,
  IWhatsAppMessages,
  useSendWhatsAppMessages,
} from 'modules/tickets/apis';
import React, { useMemo } from 'react';
import { styled } from 'styled-components';

import { WhatsAppChatContent } from './whatsapp-chat-content';
import { WhatsappFooter } from './whatsapp-footer';

const ConversationWrapper = styled(FlexBox)`
  position: relative;
`;

const DateText = styled(Typography)`
  background: #fffffff2;
  color: ${({ theme }) => theme.pallete.grayVariant2};
  padding: 5px 12px 6px 12px;
  border-radius: 6px;
  width: fit-content;
`;

export const WhatsAppConversations = (
  props: { data: IWhatsAppMessages } & { isDisabled?: boolean }
) => {
  const { data, isDisabled } = props;
  const [chatData, setChatData] = React.useState(data.conversations);
  const { mutateAsync } = useSendWhatsAppMessages();

  React.useEffect(() => {
    setChatData(data.conversations);
  }, [data.conversations]);

  const onSendAction = React.useCallback(
    (newConversation: { message: string; fileUrl?: string; type: string }) => {
      setChatData((prevValue) => [
        ...prevValue,
        {
          created_at: new Date().toISOString(),
          delivered: false,
          is_agent_sent: true,
          message: newConversation.message,
          message_id: '',
          read: false,
          file_url: newConversation.fileUrl,
          message_type: newConversation.type,
        },
      ]);
      mutateAsync({
        messageId: chatData[chatData.length - 1].message_id,
        message: newConversation.message,
        fileUrl: newConversation.fileUrl,
        type: newConversation.type,
      });
    },
    [chatData, mutateAsync]
  );

  const groupedBydateData = useMemo(
    () =>
      chatData.reduce(
        (acc, curr) => {
          const date = curr.created_at.split('T')[0];

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(curr);
          return acc;
        },
        {} as {
          [key: string]: Conversation[];
        }
      ),
    [chatData]
  );

  return (
    <ConversationWrapper height="100%" width="100%" flexDirection="column">
      <ConversationContainerBackground>
        <FlexBox
          height="calc(100% - 150px)"
          flexDirection="column"
          gap="10px"
          overflowY="auto"
          padding="10px"
        >
          {Object.keys(groupedBydateData).map((date) => {
            return (
              <React.Fragment key={date}>
                <FlexBox justifyContent="center">
                  <DateText variant="subheading2">
                    {isToday(date)
                      ? 'Today'
                      : isYesterday(date)
                        ? 'Yesterday'
                        : date}
                  </DateText>
                </FlexBox>
                {groupedBydateData[date]?.map((item, index) => (
                  <WhatsAppChatContent
                    key={index}
                    content={item}
                    agentName={data.agent_name}
                    customerName={data.customer_name}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </FlexBox>
      </ConversationContainerBackground>
      <WhatsappFooter onSendAction={onSendAction} isDisabled={isDisabled} />
    </ConversationWrapper>
  );
};

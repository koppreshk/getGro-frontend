import { SocketEventKeys, useSocket } from 'lib/providers/socket-provider';
import { ErrorMessage, FlexBox, NoDataIllustration } from 'lib/ui-ux';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { AllChatConversations, useFetchAllConversations } from '../apis';
import { ChatList } from '../components';
import {
  ChatConversationsContainer,
  ChatDetailsLayoutContainer,
} from '../containers';

const StyledLayoutWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.white};
`;

const StyledLayouts = styled(FlexBox)`
  border-left: ${({ theme }) => theme.semantics.standardBorder};
  border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

export default function ChatLayoutPage() {
  const { data, isLoading, error, isFetching } = useFetchAllConversations();
  const { socket, getEventName } = useSocket();
  const [conversationList, setConversationList] =
    useState<AllChatConversations | null>(null);

  useEffect(() => {
    if (data) {
      setConversationList(data);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    const handleSocketEvent = (newData: string) => {
      setConversationList(JSON.parse(newData) as AllChatConversations);
    };

    const eventName = getEventName(SocketEventKeys.CHAT_COVERSATION_LIST);
    socket.on(eventName, handleSocketEvent);

    return () => {
      socket.off(eventName, handleSocketEvent);
    };
  }, [getEventName, socket]);

  const onChatItemClick = (conversationId: number) => {
    const res = conversationList?.conversations.map((conversation) => {
      if (conversation.id === conversationId && !conversation.has_seen) {
        conversation.has_seen = true;
      }
      return conversation;
    });
    setConversationList((prevValues) => {
      if (!prevValues) return null;
      return {
        ...prevValues,
        conversations: res || [],
      };
    });
  };

  if (error) {
    return <ErrorMessage statusCode={error?.message} />;
  }

  if (conversationList?.conversations.length === 0) {
    return <NoDataIllustration message="No conversations to display" />;
  }

  return (
    <>
      {
        <StyledLayoutWrapper height={'100%'} gap={'20px'}>
          <StyledLayouts width="calc(25% - 20px)">
            <ChatList
              isLoading={isFetching || isLoading}
              data={conversationList}
              onChatItemClick={onChatItemClick}
            />
          </StyledLayouts>
          <StyledLayouts width="calc(50% - 20px)">
            <ChatConversationsContainer isLoading={isFetching || isLoading} />
          </StyledLayouts>
          <StyledLayouts width="25%">
            <ChatDetailsLayoutContainer isLoading={isFetching || isLoading} />
          </StyledLayouts>
        </StyledLayoutWrapper>
      }
    </>
  );
}

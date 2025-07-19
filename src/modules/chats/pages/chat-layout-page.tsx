import { SocketEventKeys, useSocket } from 'lib/providers/socket-provider';
import {
  CenteredCircularProgress,
  ErrorMessage,
  FlexBox,
  NoDataIllustration,
} from 'lib/ui-ux';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';

import {
  AllChatConversations,
  ChatConversation,
  useInfiniteConversations,
} from '../apis';
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
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteConversations();

  const { socket, getEventName } = useSocket();
  const { ref, inView } = useInView({ threshold: 0 });

  const [conversationList, setConversationList] = useState<ChatConversation[]>(
    []
  );

  // Merge all conversations from all pages
  useEffect(() => {
    if (data) {
      const allChats = data.pages.flatMap((page) => page.conversations);
      setConversationList(allChats);
    }
  }, [data]);

  // Auto fetch next page when scroll hits bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Socket updates
  useEffect(() => {
    if (!socket) return;
    const handleSocketEvent = (newData: string) => {
      const updatedData = JSON.parse(newData) as AllChatConversations;
      const updatedChats = updatedData.conversations;
      setConversationList((prev) => {
        const seen = new Set(prev.map((c) => c.id));
        return [...updatedChats, ...prev.filter((c) => !seen.has(c.id))];
      });
    };

    const eventName = getEventName(SocketEventKeys.CHAT_COVERSATION_LIST);
    socket.on(eventName, handleSocketEvent);
    return () => {
      socket.off(eventName, handleSocketEvent);
    };
  }, [socket, getEventName]);

  const onChatItemClick = (id: number) => {
    setConversationList((prev) =>
      prev.map((c) =>
        c.id === id && !c.has_seen ? { ...c, has_seen: true } : c
      )
    );
  };

  if (isLoading) return <CenteredCircularProgress />;
  if (error) return <ErrorMessage statusCode={error.message} />;
  return (
    <>
      {conversationList.length ? (
        <StyledLayoutWrapper height="100%" gap="20px">
          <StyledLayouts width="calc(25% - 20px)">
            <ChatList
              ref={ref}
              isFetchingNextPage={isFetchingNextPage}
              data={{
                conversations: conversationList,
                page: 1,
                total_pages: data?.pages?.[0]?.total_pages || 1,
              }}
              onChatItemClick={onChatItemClick}
            />
          </StyledLayouts>
          <StyledLayouts width="calc(50% - 20px)">
            <ChatConversationsContainer />
          </StyledLayouts>
          <StyledLayouts width="25%">
            <ChatDetailsLayoutContainer />
          </StyledLayouts>
        </StyledLayoutWrapper>
      ) : (
        <NoDataIllustration message="No conversations to display" />
      )}
    </>
  );
}

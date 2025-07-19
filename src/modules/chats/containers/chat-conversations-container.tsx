import { SocketEventKeys, useSocket } from 'lib/providers/socket-provider';
import { ErrorMessage, FlexBox } from 'lib/ui-ux';
import { ChatConversationLoader } from 'lib/ui-ux/loader-components';
import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import { ChatConversationById, useFetchConversationById } from '../apis';
import { ChatConversationsLayout } from '../components/chat-conversations';

interface ChatConversationsContainerProps {
  isLoading: boolean;
}

export const ChatConversationsContainer = ({
  isLoading: isParentAPILoading,
}: ChatConversationsContainerProps) => {
  const match = useMatch('/chat/:conversationId');
  const id = match?.params.conversationId;
  const { socket, getEventName } = useSocket();

  const {
    data,
    isLoading: isPending,
    error,
  } = useFetchConversationById({ id, isParentAPILoading });

  const [conversationById, setConversationById] =
    useState<ChatConversationById | null>(null);

  // Update state when API data is initially loaded
  useEffect(() => {
    if (data) {
      setConversationById(data);
    }
  }, [data]);

  // Listen for real-time updates from the socket
  useEffect(() => {
    if (!socket) return; // Prevent running if socket is null

    const handleSocketEvent = (newData: string) => {
      const parsedData = JSON.parse(newData) as ChatConversationById;
      if (parsedData.conversation_id.toString() === id) {
        setConversationById(parsedData);
      }
    };

    const eventName = getEventName(SocketEventKeys.CHAT_MESSAGE_LIST);
    socket.on(eventName, handleSocketEvent);

    return () => {
      socket.off(eventName, handleSocketEvent);
    };
  }, [getEventName, id, socket]);

  if (isPending || isParentAPILoading) {
    return (
      <FlexBox width="100%" height="100%" flexDirection="column" padding="10px">
        <ChatConversationLoader />
      </FlexBox>
    );
  }

  if (conversationById && id) {
    return (
      <ChatConversationsLayout data={conversationById} conversationId={id} />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};

import { CenteredCircularProgress, FlexBox } from 'lib/ui-ux';
import { AllChatConversations } from 'modules/chats/apis';
import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ChatItem } from './chat-item';
import { ChatListFooter } from './chat-list-footer';
import { ChatListHeader } from './chat-list-header';

const ChatListWrapper = styled(FlexBox)`
  height: calc(100% - 126px);
`;

interface ChatListProps {
  isLoading: boolean;
  data?: AllChatConversations | null;
  onChatItemClick: (conversationId: number) => void;
}

export const ChatList = (props: ChatListProps) => {
  const { data, isLoading, onChatItemClick } = props;
  const navigate = useNavigate();
  const match = useMatch('/chat/:conversationId');
  const [selectedOption, setSelectedOption] = useState('all-conversations');

  const filteredConversations = useMemo(() => {
    if (selectedOption === 'all-conversations') {
      return data?.conversations ?? [];
    }

    return (
      data?.conversations?.filter((item) =>
        item.chat_source.includes(selectedOption)
      ) ?? []
    );
  }, [data?.conversations, selectedOption]);

  const doesconversationIdExist = useMemo(
    () =>
      filteredConversations.some(
        (item) => item.id.toString() === match?.params.conversationId
      ),
    [filteredConversations, match?.params.conversationId]
  );

  useEffect(() => {
    if (!doesconversationIdExist && filteredConversations.length > 0) {
      navigate(`${filteredConversations[0].id}`);
    }
  }, [
    data?.conversations,
    doesconversationIdExist,
    filteredConversations,
    navigate,
  ]);

  return (
    <FlexBox flexDirection="column" height="100%" width="100%">
      <ChatListHeader
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <ChatListWrapper flexDirection="column" width="100%" overflowY="auto">
        {isLoading ? (
          <CenteredCircularProgress />
        ) : filteredConversations.length ? (
          filteredConversations.map((item) => (
            <ChatItem
              key={item.id}
              {...item}
              onChatItemClick={onChatItemClick}
            />
          ))
        ) : (
          <FlexBox justifyContent="center" alignItems="center" height="100%">
            <Trans i18nKey={'no_conversations_cound'} />
          </FlexBox>
        )}
      </ChatListWrapper>
      <ChatListFooter
        totalPages={data?.total_pages || 0}
        pageNumber={data?.page || 1}
      />
    </FlexBox>
  );
};

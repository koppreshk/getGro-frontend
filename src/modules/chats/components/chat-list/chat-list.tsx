import { FlexBox } from 'lib/ui-ux';
import { AllChatConversations } from 'modules/chats/apis';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ChatItem } from './chat-item';
import { ChatListHeader } from './chat-list-header';

const ChatListWrapper = styled(FlexBox)``;

interface ChatListProps {
  data: AllChatConversations;
  isFetchingNextPage: boolean;
  onChatItemClick: (conversationId: number) => void;
}

// eslint-disable-next-line react/display-name
export const ChatList = forwardRef((props: ChatListProps, ref) => {
  const { data, onChatItemClick, isFetchingNextPage } = props;
  const navigate = useNavigate();
  const match = useMatch('/chat/:conversationId');
  const [selectedOption, setSelectedOption] = useState('all-conversations');

  const filteredConversations = useMemo(() => {
    if (selectedOption === 'all-conversations') {
      return data.conversations;
    }

    return data.conversations.filter((item) =>
      item.chat_source.includes(selectedOption)
    );
  }, [data.conversations, selectedOption]);

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
    data.conversations,
    doesconversationIdExist,
    filteredConversations,
    navigate,
  ]);

  return (
    <FlexBox flexDirection="column" height="100%" width="100%">
      <ChatListHeader
        selectedOption={selectedOption}
        isFetchingNextPage={isFetchingNextPage}
        setSelectedOption={setSelectedOption}
      />
      <FlexBox
        flexDirection="column"
        overflowY="auto"
        height="calc(100% - 70px);"
      >
        <ChatListWrapper flexDirection="column" width="100%">
          {filteredConversations.length ? (
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
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          style={{ minHeight: '1px' }}
        />
      </FlexBox>
    </FlexBox>
  );
});

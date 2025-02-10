import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import { FlexBox, RefreshButton } from 'lib/ui-ux';
import { AllChatConversations } from 'modules/chats/apis';
import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ChatItem } from './chat-item';
import { FilterChat } from './filter-chat';

const ChatListWrapper = styled(FlexBox)`
  height: calc(100% - 70px);
`;

interface ChatListProps {
  data: AllChatConversations;
}

export const ChatList = (props: ChatListProps) => {
  const { data } = props;
  const navigate = useNavigate();
  const match = useMatch('/chat/:conversationId');
  const [selectedView, setSelectedView] = useState('all-conversations');
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

  const filters = [
    { key: 'all-conversations' },
    { key: 'my-pending' },
    { key: 'my-unsolved' },
    { key: 'my-conversations' },
    { key: 'all-unassigned' },
    { key: 'all-unsolved' },
  ];

  return (
    <FlexBox flexDirection="column" height="100%" width="100%">
      <FlexBox
        justifyContent="space-between"
        width="100%"
        padding="15px 0px 15px 15px"
      >
        <FlexBox gap={'10px'}>
          <FormControl size="small">
            <InputLabel id="demo-select-small-label">{t('view')}</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small-label"
              value={selectedView}
              label="Views"
              onChange={(ev) => setSelectedView(ev.target.value)}
            >
              {filters.map((item) => (
                <MenuItem key={item.key} value={item.key}>
                  <Typography variant="h5">
                    <Trans i18nKey={item.key.split('-').join('_')} />
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FilterChat
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </FlexBox>
        <RefreshButton />
      </FlexBox>
      <ChatListWrapper flexDirection="column" width="100%" overflowY="auto">
        {filteredConversations.length ? (
          filteredConversations.map((item) => (
            <ChatItem key={item.id} {...item} />
          ))
        ) : (
          <FlexBox justifyContent="center" alignItems="center" height="100%">
            <Trans i18nKey={'no_conversations_cound'} />
          </FlexBox>
        )}
      </ChatListWrapper>
    </FlexBox>
  );
};

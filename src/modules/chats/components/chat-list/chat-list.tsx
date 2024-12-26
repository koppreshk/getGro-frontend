import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { FlexBox, RefreshButton } from 'lib/ui-ux';
import { AllChatConversations } from 'modules/chats/apis';
import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ChatItem } from './chat-item';

const ChatListWrapper = styled(FlexBox)`
  height: calc(100% - 54px);
`;

interface ChatListProps {
  data: AllChatConversations;
}

export const ChatList = (props: ChatListProps) => {
  const { data } = props;
  const navigate = useNavigate();
  const match = useMatch('/chat/:conversationId');
  const [selectedView, setSelectedView] = useState('all-conversations');

  const doesconversationIdExist = useMemo(
    () =>
      data.conversations.some(
        (item) => item.id.toString() === match?.params.conversationId
      ),
    [data.conversations, match?.params.conversationId]
  );

  useEffect(() => {
    if (!doesconversationIdExist) {
      navigate(`${data.conversations[0].id}`);
    }
  }, [data.conversations, doesconversationIdExist, navigate]);

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
        <FormControl sx={{ width: '80%' }} size="small">
          <InputLabel id="demo-select-small-label">View</InputLabel>
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
        <RefreshButton />
      </FlexBox>
      <ChatListWrapper flexDirection="column" width="100%" overflowY="auto">
        {data.conversations.map((item) => (
          <ChatItem key={item.id} {...item} />
        ))}
      </ChatListWrapper>
    </FlexBox>
  );
};

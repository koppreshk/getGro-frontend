import { Badge, Avatar } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { chooseRandomColors } from 'lib/utils';
import { ChatConversation } from 'modules/chats/apis';
import { useSourceIcon } from 'modules/tickets/hooks';
import { useMemo } from 'react';
import styled from 'styled-components';

const SmallAvatar = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.white};
  border-radius: 100%;
  padding: 1px;
`;

export const CustomSourceAvatar = (
  props: Pick<ChatConversation, 'chat_source' | 'customer_name' | 'chat_type'>
) => {
  const { customer_name, chat_source, chat_type } = props;
  const getSourceIcon = useSourceIcon();
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(customer_name),
    [customer_name]
  );

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <SmallAvatar>
          {getSourceIcon(
            chat_type === 'instagram_message' || chat_type === 'fb_page_message'
              ? chat_type
              : chat_source,
            { width: '16px', height: '16px' }
          )}
        </SmallAvatar>
      }
    >
      <Avatar
        sx={{ fontSize: '14px', color: textColor, bgcolor: backgroundColor }}
      >
        {customer_name?.split(' ').length > 1
          ? customer_name
              .split(' ')
              .map((name) => name[0])
              .join('')
          : customer_name.slice(0, 2)}
      </Avatar>
    </Badge>
  );
};

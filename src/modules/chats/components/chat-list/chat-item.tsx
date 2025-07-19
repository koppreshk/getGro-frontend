import { SouthWest, NorthEast, AttachFile } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useAppDispatch } from 'lib/hooks';
import { FlexBox, NewMessageIndicator } from 'lib/ui-ux';
import { isToday, isYesterday } from 'lib/utils';
import { DateTime } from 'luxon';
import { ChatConversation } from 'modules/chats/apis';
import { setChatDetails } from 'modules/chats/storage';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';

import { CustomSourceAvatar } from './custom-source-avatar';

const ChatWrapper = styled(FlexBox)<{ $isChatActive: boolean }>`
  padding: 15px 10px 15px 15px;
  border-bottom: ${({ theme }) => theme.semantics.standardBorder};
  cursor: pointer;

  ${({ $isChatActive }) =>
    $isChatActive &&
    css`
      background-color: ${(props) => props.theme.pallete.purpleLight};
      border-left-width: 4px;
      border-style: solid;
      border-color: ${(props) => props.theme.pallete.primaryPurple};
      border-width: 0;
      border-left-width: thick;
    `}

  &:hover {
    background-color: ${(props) =>
      props.$isChatActive
        ? props.theme.pallete.purpleLight
        : props.theme.pallete.grayVariant5};
  }
`;

const ChatContent = styled(FlexBox)`
  margin-left: 15px;
  width: calc(100% - 55px);
`;

const StyledTypography = styled(Typography)`
  && {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${(props) => props.theme.pallete.grayNeutral};
  }
`;

export const ChatItem = (
  props: ChatConversation & {
    onChatItemClick: (conversationId: number) => void;
  }
) => {
  const {
    chat_source,
    created_at,
    customer_name,
    id,
    last_message,
    has_seen,
    onChatItemClick: modifyChatItem,
    ...rest
  } = props;

  const match = useMatch('/chat/:conversationId');
  const navigate = useNavigate();
  const { pallete } = useTheme();
  const dispatch = useAppDispatch();
  const convId = match?.params.conversationId;
  const isChatActive = useMemo(() => convId === id.toString(), [id, convId]);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (convId === id.toString() && ref.current) {
      // ref.current.scrollIntoView({ behavior: 'smooth' });

      dispatch(
        setChatDetails({
          chat_source,
          created_at,
          customer_name,
          id,
          last_message,
          has_seen,
          ...rest,
        })
      );
    }
  }, [
    chat_source,
    convId,
    created_at,
    customer_name,
    dispatch,
    has_seen,
    id,
    last_message,
    props,
    rest,
  ]);

  const onChatItemClick = () => {
    navigate(`${id}`);
    modifyChatItem(id);
  };
  const isoDate = DateTime.fromFormat(created_at, 'yyyy-LL-dd hh:mm a').toISO();
  const time = DateTime.fromISO(isoDate!).toFormat('hh:mm a');
  const { t } = useTranslation();
  return (
    <ChatWrapper
      ref={ref}
      onClick={onChatItemClick}
      $isChatActive={isChatActive}
    >
      <FlexBox justifyContent="center" alignItems="center">
        <CustomSourceAvatar
          chat_source={chat_source}
          customer_name={customer_name}
          chat_type={props.chat_type}
        />
      </FlexBox>
      <ChatContent flexDirection="column" gap="4px">
        <FlexBox justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: 'calc(100% - 125px)',
              textWrap: 'nowrap',
            }}
          >
            {customer_name}
          </Typography>
          <FlexBox flexDirection="row" gap={'10px'}>
            <Typography
              variant="caption"
              title="Created At"
              sx={{ color: pallete.grayNeutral }}
            >
              {isToday(isoDate!)
                ? `${t('today')}, ${time}`
                : isYesterday(isoDate!)
                  ? `${t('yesterday')}, ${time}`
                  : created_at}
            </Typography>
            {last_message?.direction === 'incoming' ? (
              <SouthWest
                titleAccess="Incoming"
                sx={{
                  width: '16px',
                  height: '16px',
                  color: pallete.grayNeutral,
                }}
              />
            ) : (
              <NorthEast
                titleAccess="Outgoing"
                sx={{
                  width: '16px',
                  height: '16px',
                  color: pallete.grayNeutral,
                }}
              />
            )}
            {has_seen ? null : <NewMessageIndicator />}
          </FlexBox>
        </FlexBox>
        {last_message?.message_type === 'attachment' ? (
          <FlexBox>
            <AttachFile
              sx={{ width: '16px', height: '16px', color: pallete.grayNeutral }}
            />
            <StyledTypography variant="body2">Attachment</StyledTypography>
          </FlexBox>
        ) : (
          <StyledTypography variant="body2" title={last_message?.message}>
            {last_message?.message}
          </StyledTypography>
        )}
      </ChatContent>
    </ChatWrapper>
  );
};

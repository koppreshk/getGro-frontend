import { History } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { getFormattedDate } from 'lib/utils';
import { DateTime } from 'luxon';
import { ITicketDetails } from 'modules/tickets/apis';
import { useMemo } from 'react';
import { Trans } from 'react-i18next';
import { styled, useTheme } from 'styled-components';

import { getParsedChatType } from '../../tickets-card-view/card-view';
import { HeaderWrapper } from '../ticket-list-view';

export const Platform = styled(Typography)<{ $platform: string }>`
  && {
    color: ${({ theme, $platform }) => {
      switch ($platform) {
        case 'facebook':
          return theme.channelSpecific.facebook;
        case 'email':
          return theme.channelSpecific.email;
        case 'whatsapp':
          return theme.channelSpecific.whatsApp;
        case 'twitter':
          return theme.channelSpecific.twitter;
        case 'telephonic':
          return theme.channelSpecific.telephonic;
        case 'instagram':
          return theme.channelSpecific.instagram;
        case 'sms':
          return theme.channelSpecific.sms;
        default:
          return undefined;
      }
    }};
    font-weight: bold;
  }
`;

export const TicketConversationHeader = (props: {
  ticketDetailsById: Partial<ITicketDetails>;
}) => {
  const { ticketDetailsById } = props;
  const customerName = ticketDetailsById?.customerName
    ? ticketDetailsById.customerName
    : 'User';
  const { pallete } = useTheme();

  const formattedDate = useMemo(
    () =>
      getFormattedDate(
        ticketDetailsById?.createdAt
          ? (DateTime.fromFormat(
              ticketDetailsById.createdAt || '',
              'yyyy-MM-dd hh:mm a'
            ).toISO() as string)
          : '',
        { dateStyle: 'long', hour12: true, timeStyle: 'short' }
      ),
    [ticketDetailsById?.createdAt]
  );

  return (
    <HeaderWrapper width="100%" flexDirection="column">
      <Typography variant="h5">
        <Trans i18nKey={'interactions_header'} />
      </Typography>
      <FlexBox justifyContent="space-between">
        <FlexBox gap="5px">
          <Typography variant="body2">
            <Trans
              i18nKey={'interactions_sub_heading'}
              customerName={customerName}
            >
              initiated by {{ customerName }} via
            </Trans>
          </Typography>
          <Platform
            variant="body2"
            $platform={
              ticketDetailsById?.createdFrom?.toLocaleLowerCase() ?? ''
            }
          >
            {getParsedChatType(ticketDetailsById?.createdFrom || '')}
          </Platform>
        </FlexBox>
        <Tooltip title={`Created at ${ticketDetailsById?.createdAt}`}>
          <FlexBox gap={'5px'} alignItems="center">
            <History
              sx={{
                width: '16px',
                height: '16px',
                color: pallete.grayVariant2,
              }}
            />
            <Typography
              variant="subheading2"
              sx={{ color: pallete.grayVariant2 }}
            >
              {formattedDate}
            </Typography>
          </FlexBox>
        </Tooltip>
      </FlexBox>
    </HeaderWrapper>
  );
};

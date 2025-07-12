import { InfoOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { CustomTabPanel, FlexBox, StyledTab, StyledTabs } from 'lib/ui-ux';
import { ChatType } from 'modules/chats/apis';
import {
  TelephonicConversationContainer,
  EmailConversationContainer,
  WhatsAppConversationContainer,
  TicketLinksContainer,
  TicketHistoryContainer,
} from 'modules/tickets/containers';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { TicketConversationHeader } from './ticket-conversation-header';
import { TicketsInfoTab } from '../tickets-info/tickets-info';

export interface ITicketConversationLayoutProps {}

const LayoutWrapper = styled(FlexBox)`
  background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const getParsedChatTypeAsString = (chatType: string): string => {
  switch (chatType) {
    case ChatType.InstagramComment:
      return 'instagram post';
    case ChatType.InstagramMessage:
      return 'instagram message';
    case ChatType.FacebookPageMessage:
      return 'facebook message';
    case ChatType.FacebookPageComment:
      return 'facebook post';
    case ChatType.WhatsappMessage:
      return 'whatsapp message';
    default:
      return chatType.split('_').join(' ');
  }
};

export const TicketConversationLayout = () => {
  const ticketDetailsById = useAppSelector(
    (state) => state.tickets.ticketDetails
  );
  const ticketSource =
    ticketDetailsById && ticketDetailsById.source?.toLocaleLowerCase();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderConversations = React.useCallback(() => {
    switch (ticketSource) {
      case 'email':
        return <EmailConversationContainer />;
      case 'ivr':
        return <TelephonicConversationContainer />;
      case 'whatsapp':
        return <WhatsAppConversationContainer />;
      default:
        return <></>;
    }
  }, [ticketSource]);

  const renderLinks = useCallback(() => {
    return <TicketLinksContainer />;
  }, []);

  const renderTicketInfo = useCallback(() => {
    return <TicketsInfoTab />;
  }, []);

  const renderHistory = useCallback(() => {
    return <TicketHistoryContainer />;
  }, []);

  return (
    <LayoutWrapper width="100%" flexDirection="column">
      <TicketConversationHeader ticketDetailsById={ticketDetailsById!} />
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
        sx={{ minHeight: 'unset' }}
      >
        <StyledTab
          label={t('conversations_label')}
          icon={
            ticketDetailsById?.createdFrom !== 'email' ? (
              <Tooltip
                title={`Conversation started through ${getParsedChatTypeAsString(ticketDetailsById?.createdFrom ?? '')}, but responses will continue as email communication.`}
                arrow
              >
                <InfoOutlined
                  fontSize="small"
                  sx={{ width: '16px', height: '16px' }}
                />
              </Tooltip>
            ) : (
              <></>
            )
          }
          iconPosition="end"
        />
        <StyledTab label={t('links_label')} />
        <StyledTab label={t('history_label')} />
        <StyledTab label={t('ticket_info')} />
      </StyledTabs>
      {/* <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="ticket-tabs" sx={{ minHeight: 'unset' }}>
                <StyledTab label="Conversations" />
                <StyledTab label="Links" />
                <StyledTab label="History" />
            </Tabs> */}
      <div style={{ height: 'calc(100% - 114px)' }}>
        <CustomTabPanel value={value} index={0} height="100%">
          {renderConversations()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} height="100%">
          {renderLinks()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} height="100%">
          {renderHistory()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3} height="100%">
          {renderTicketInfo()}
        </CustomTabPanel>
      </div>
    </LayoutWrapper>
  );
};

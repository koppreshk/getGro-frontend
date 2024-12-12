import { DrawerExtended } from 'lib/ui-ux';
import { SplitTicketsContainer } from 'modules/tickets/containers/conversations/email/more-actions';
import { useTranslation } from 'react-i18next';

import { IEmailCardProps } from '../../email-card';

export interface SplitTicketProps extends Pick<IEmailCardProps, 'emailProps'> {
  showSplitTicketDrawer: boolean;
  onCloseDrawer: () => void;
}

export const SplitTicket = (props: SplitTicketProps) => {
  const { onCloseDrawer, showSplitTicketDrawer, emailProps } = props;
  const { t } = useTranslation();
  return (
    <DrawerExtended
      width="600px"
      header={t('split_ticket')}
      anchor="right"
      open={showSplitTicketDrawer}
      onRenderContent={() => (
        <SplitTicketsContainer
          onCloseDrawer={onCloseDrawer}
          emailProps={emailProps}
        />
      )}
      onClose={onCloseDrawer}
    />
  );
};

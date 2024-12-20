import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IWhatsAppConfigDetails } from 'modules/settings/apis/marketplace/whatsapp';
import AppConfig from 'modules/settings/common/app-config';
import { ManageWhatsAppNumbersContainer } from 'modules/settings/containers/marketplace/whatsapp';
import { useState } from 'react';

import { WhatsAppHeaderActionButtons } from './whatsapp-header-action-buttons';
import WhatsAppIcon from '../../../../../../assets/svg/whatsapp.svg?react';

const OverviewContents = () => {
  return (
    <FlexBox flexDirection="column" width="100%">
      <Typography variant="body2" paragraph>
        WhatsApp integration is a cloud-based communication platform enabling
        businesses to manage customer interactions via calls. It offers features
        such as virtual numbers and IVR systems for seamless communication.
      </Typography>
      <Typography variant="body2" paragraph>
        Integrate WhatsApp integration into GetGro to streamline call management
        processes, enabling businesses to effortlessly make and receive calls
        and tracking the call history in real-time.
      </Typography>
      <Typography variant="body2" paragraph>
        The WhatsApp integration integration offers the following valuable
        features, Within the GetGro
      </Typography>
      <ul>
        <li>
          <b>Number Assignment:</b> Allocate various WhatsApp integration
          numbers to distinct categories, streamlining call prioritization.
        </li>
        <li>
          <b>Call History Monitoring:</b> Keep track of call activities in
          real-time by agent, ensuring transparency and accountability.
        </li>
        <li>
          <b>Ticket Generation:</b> Simplify post-call actions with auto-created
          tickets for outbound, inbound, or missed calls.
        </li>
        <li>
          <b>Manual Ticket Creation: </b>Offer flexibility by allowing manual
          ticket logging based on call history, providing additional control.
        </li>
      </ul>
    </FlexBox>
  );
};

const InstallationContents = () => {
  return (
    <FlexBox width="100%" flexDirection="column">
      <Typography variant="body2" paragraph>
        To install and connect WhatsApp integration with GetGro, follow the
        instructions in the following links:
      </Typography>
      <Typography
        component="a"
        variant="body2"
        href="https://support.GetGro.com/kb/article/15906/set-up-WhatsApp-with-GupShup"
      >
        https://support.GetGro.com/kb/article/15906/set-up-WhatsApp-with-GupShup
      </Typography>
    </FlexBox>
  );
};

export const WhatsAppConfigurationLayout = (props: {
  data: IWhatsAppConfigDetails;
  updateInstallation: () => void;
}) => {
  const [showManageContent, setManageDisplay] = useState(false);

  const toggleManageDisplay = () => setManageDisplay((prev) => !prev);

  return (
    <AppConfig>
      <AppConfig.Header
        appDescription="Enhance customer engagement with getgro WhatsApp integration"
        appTitle="WhatsApp"
        appIcon={() => <WhatsAppIcon width="60px" height="60px" />}
      >
        <WhatsAppHeaderActionButtons
          {...props}
          showManageContent={showManageContent}
          toggleManageDisplay={toggleManageDisplay}
        />
      </AppConfig.Header>
      <AppConfig.Body>
        <>
          {showManageContent ? (
            <ManageWhatsAppNumbersContainer />
          ) : (
            <AppConfig.TabsPanel
              tabProps={[
                {
                  label: 'Overview',
                  content: <OverviewContents />,
                },
                {
                  label: 'Installation',
                  content: <InstallationContents />,
                },
              ]}
              email="support@getgro.com"
              website="https://intent.getgro.io/dashboard"
              lastUpdated="Oct 22, 2024"
              publishedOn="Oct 22, 2024"
              version="1.0.0"
            />
          )}
        </>
      </AppConfig.Body>
    </AppConfig>
  );
};

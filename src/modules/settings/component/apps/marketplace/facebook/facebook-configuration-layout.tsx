import { Facebook } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IFacebookConfigDetails } from 'modules/settings/apis/marketplace/facebook';
import AppConfig from 'modules/settings/common/app-config';
import { ManageFacebookPagesContainer } from 'modules/settings/containers/marketplace/facebook/manage-facebook-pages-container';
import { useState } from 'react';
import { useTheme } from 'styled-components';

import { FacebookHeaderActionButtons } from './facebook-header-action-buttons';

const OverviewContents = () => {
  return (
    <FlexBox flexDirection="column" width="100%">
      <Typography variant="body2" paragraph>
        Getgro enhances customer service on Facebook with seamless integration.
        Effortlessly manage Facebook messages alongside other channels, all from
        one, unified platform.
      </Typography>
      <Typography variant="h5" paragraph>
        Features:
      </Typography>
      <ul>
        <li>
          <b>Converting Facebook Messages to Conversations:</b> Automatically
          create helpdesk conversation whenever a customer initiates a chat or
          sends a private message on your Facebook page.
        </li>
        <li>
          <b>Two-way Communication:</b> Empower your support agents to reply to
          customer messages directly through getGro, eliminating the need to
          switch between platforms. This ensures faster response times and a
          smoother customer experience.
        </li>
        <li>
          <b>Boosting Efficiency:</b> Elevate your customer support experience
          and boost customer satisfaction with the power of Facebook integration
        </li>
      </ul>
    </FlexBox>
  );
};

const InstallationContents = () => {
  return (
    <FlexBox width="100%" flexDirection="column">
      <Typography variant="body2" paragraph>
        To install and connect Facebook integration with Getgro, follow the
        instructions in the following links:
      </Typography>
      <Typography
        component="a"
        variant="body2"
        href="https://support.getgro.com/kb/article/506/set-up-Facebook"
      >
        https://support.getgro.com/kb/article/506/set-up-Facebook
      </Typography>
    </FlexBox>
  );
};

export const FacebookConfigurationLayout = (props: {
  data?: IFacebookConfigDetails | null;
  updateInstallation: () => void;
}) => {
  const [showManageContent, setManageDisplay] = useState(false);

  const toggleManageDisplay = () => setManageDisplay((prev) => !prev);
  const { channelSpecific } = useTheme();

  return (
    <AppConfig>
      <AppConfig.Header
        appDescription="Enhance customer engagement with getgro Facebook integration"
        appTitle="Facebook"
        appIcon={() => (
          <Facebook
            sx={{
              width: '60px',
              height: '60px',
              fill: channelSpecific.facebook + '!important',
            }}
          />
        )}
      >
        <FacebookHeaderActionButtons
          {...props}
          showManageContent={showManageContent}
          toggleManageDisplay={toggleManageDisplay}
        />
      </AppConfig.Header>
      <AppConfig.Body>
        <>
          {showManageContent ? (
            <ManageFacebookPagesContainer />
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

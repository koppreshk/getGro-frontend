import { Instagram } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IInstagramConfigDetails } from 'modules/settings/apis/marketplace/instagram';
import AppConfig from 'modules/settings/common/app-config';
import { useTheme } from 'styled-components';

import { InstagramHeaderActionButtons } from './instagram-header-action-buttons';

const OverviewContents = () => {
  return (
    <FlexBox flexDirection="column" width="100%">
      <Typography variant="body2" paragraph>
        Getgro enhances customer service on Instagram with seamless integration.
        Effortlessly manage Instagram messages alongside other channels, all
        from one, unified platform.
      </Typography>
      <Typography variant="h5" paragraph>
        Features:
      </Typography>
      <ul>
        <li>
          <b>Effortless Connectivity:</b> Easily link your Instagram account to
          Getgro. Enjoy a quick and hassle-free setup to keep your social media
          efforts aligned with your customer service.
        </li>
        <li>
          <b>Integrated Messaging:</b> Receive and respond to Instagram messages
          directly within Getgro. Streamline your communication process and
          enhance customer support.
        </li>
        <li>
          <b>Multimedia Sharing:</b> Seamlessly exchange texts, images, videos,
          and other multimedia content with customers, enhancing communication
          and enriching the customer experience.
        </li>
      </ul>
    </FlexBox>
  );
};

const InstallationContents = () => {
  return (
    <FlexBox width="100%" flexDirection="column">
      <Typography variant="body2" paragraph>
        To install and connect Instagram integration with Getgro, follow the
        instructions in the following links:
      </Typography>
      <Typography
        component="a"
        variant="body2"
        href="https://support.getgro.com/kb/article/506/set-up-Instagram"
      >
        https://support.getgro.com/kb/article/506/set-up-Instagram
      </Typography>
    </FlexBox>
  );
};

export const InstagramConfigurationLayout = (props: {
  data: IInstagramConfigDetails;
}) => {
  const { channelSpecific } = useTheme();

  return (
    <AppConfig>
      <AppConfig.Header
        appDescription="Enhance customer engagement with getgro Instagram integration"
        appTitle="Instagram"
        appIcon={() => (
          <Instagram
            sx={{
              width: '60px',
              height: '60px',
              fill: channelSpecific.instagram + '!important',
            }}
          />
        )}
      >
        <InstagramHeaderActionButtons {...props} />
      </AppConfig.Header>
      <AppConfig.Body>
        <>
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
        </>
      </AppConfig.Body>
    </AppConfig>
  );
};

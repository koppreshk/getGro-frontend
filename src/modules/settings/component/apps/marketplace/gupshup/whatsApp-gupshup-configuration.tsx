/// <reference types="vite-plugin-svgr/client" />

import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IGupshupConfigDetails } from 'modules/settings/apis/marketplace/gupshup';
import {
  AddWhatsAppGupShupConfigContainer,
  UpdateWhatsAppGupshupConfigContainer,
} from 'modules/settings/containers/marketplace/gupshup';
import { useCallback, useState } from 'react';

import { AddAppConfigurationDialog, AppConfigurationLayout } from '..';
import { DeleteGupShupConfigurations } from './delete-gupshup-configurations';
import GupShupIcon from '../../../../../../assets/svg/gupshup.svg?react';

function OverviewContents() {
  return (
    <>
      <Typography variant="body2" paragraph>
        WhatsApp with GupShup integration is a cloud-based communication
        platform enabling businesses to manage customer interactions via calls.
        It offers features such as virtual numbers and IVR systems for seamless
        communication.
      </Typography>
      <Typography variant="body2" paragraph>
        Integrate WhatsApp with GupShup integration into GetGro to streamline
        call management processes, enabling businesses to effortlessly make and
        receive calls and tracking the call history in real-time.
      </Typography>
      <Typography variant="body2" paragraph>
        The WhatsApp with GupShup integration integration offers the following
        valuable features, Within the GetGro
      </Typography>
      <ul>
        <li>
          <b>Number Assignment:</b> Allocate various WhatsApp with GupShup
          integration numbers to distinct categories, streamlining call
          prioritization.
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
    </>
  );
}

function InstallationContents() {
  return (
    <FlexBox width="100%" flexDirection="column">
      <Typography variant="body2" paragraph>
        To install and connect WhatsApp with GupShup integration with GetGro,
        follow the instructions in the following links:
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
}

export const WhatsAppGupshupConfiguration = (props: {
  data: IGupshupConfigDetails;
  updateInstallation: () => void;
}) => {
  const isInstalled = Object.keys(props.data).length > 0;
  const [openPopup, setOpenPopup] = useState(false);
  const togglePopup = useCallback(() => {
    setOpenPopup((prevValue) => !prevValue);
  }, []);

  const appConfigDialogContent = () => {
    return isInstalled ? (
      <UpdateWhatsAppGupshupConfigContainer togglePopup={togglePopup} />
    ) : (
      <AddWhatsAppGupShupConfigContainer
        togglePopup={togglePopup}
        updateInstallation={props.updateInstallation}
      />
    );
  };

  return (
    <>
      <AppConfigurationLayout
        InstallationContents={InstallationContents}
        OverviewContents={OverviewContents}
        appDescription="Enhance customer engagement with WhatsApp integration on Gupshup"
        appTitle="Gupshup"
        email="support@getgro.com"
        website="https://intent.getgro.io/dashboard"
        lastUpdated="May 12, 2024"
        publishedOn="May 12, 2024"
        version="1.0.0"
        appIcon={() => <GupShupIcon width="60px" height="60px" />}
        togglePopup={togglePopup}
        isAppInstalled={isInstalled}
        unInstallApp={() => <DeleteGupShupConfigurations />}
      />
      <AddAppConfigurationDialog
        dialogContent={appConfigDialogContent}
        openPopup={openPopup}
        togglePopup={togglePopup}
        title="WhatsApp - GupShup Configuration"
        maxWidth="md"
      />
    </>
  );
};

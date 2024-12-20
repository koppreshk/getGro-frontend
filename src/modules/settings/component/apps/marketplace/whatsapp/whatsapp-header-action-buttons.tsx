import { Edit, GetApp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { BackButton, FlexBox } from 'lib/ui-ux';
import { IWhatsAppConfigDetails } from 'modules/settings/apis/marketplace/whatsapp';
import { AddWhatsAppNumberContainer } from 'modules/settings/containers/marketplace/whatsapp';
import { AddWhatsAppConfigContainer } from 'modules/settings/containers/marketplace/whatsapp/add-whatsapp-config-container';
import { UpdateWhatsAppConfigContainer } from 'modules/settings/containers/marketplace/whatsapp/update-whatsapp-config-container';
import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteWhatsAppConfigurations } from './delete-whatsapp-configurations';
import { AddAppConfigurationDialog } from '../add-app-configuration-dialog';

interface WhatsAppHeaderActionButtonsProps {
  data: IWhatsAppConfigDetails;
  showManageContent: boolean;
  updateInstallation: () => void;
  toggleManageDisplay: () => void;
}

export const WhatsAppHeaderActionButtons = (
  props: WhatsAppHeaderActionButtonsProps
) => {
  const { t } = useTranslation();
  const { toggleManageDisplay, showManageContent } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddAccountDialog, setAddAccountDialogDisplay] = useState(false);

  const toggleDialog = useCallback(() => {
    setOpenDialog((prevValue) => !prevValue);
  }, []);

  const toggleAddAccountDialog = useCallback(() => {
    setAddAccountDialogDisplay((prevValue) => !prevValue);
  }, []);

  const isInstalled = useMemo(
    () => Object.keys(props.data).length > 0,
    [props.data]
  );

  const appConfigDialogContent = () => {
    return isInstalled ? (
      <UpdateWhatsAppConfigContainer togglePopup={toggleDialog} />
    ) : (
      <AddWhatsAppConfigContainer
        togglePopup={toggleDialog}
        updateInstallation={props.updateInstallation}
      />
    );
  };

  return (
    <>
      <FlexBox gap={'10px'} height="fit-content">
        {isInstalled ? (
          showManageContent ? (
            <>
              <BackButton variant="outlined" onClick={toggleManageDisplay} />
              <Button
                variant="contained"
                size="medium"
                onClick={toggleAddAccountDialog}
              >
                {t('add_account')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                size="medium"
                onClick={toggleManageDisplay}
              >
                {t('manage')}
              </Button>
              <DeleteWhatsAppConfigurations />
              <Button
                variant="contained"
                size="medium"
                onClick={toggleDialog}
                startIcon={<Edit />}
              >
                {t('edit')}
              </Button>
            </>
          )
        ) : (
          <Button
            variant="contained"
            size="medium"
            onClick={toggleDialog}
            endIcon={<GetApp />}
          >
            {t('install')}
          </Button>
        )}
      </FlexBox>
      <AddAppConfigurationDialog
        dialogContent={appConfigDialogContent}
        openPopup={openDialog}
        togglePopup={toggleDialog}
        title={t('whatsapp_configuration')}
        maxWidth="md"
      />
      <AddAppConfigurationDialog
        dialogContent={() => (
          <AddWhatsAppNumberContainer
            toggleAddAccountDialog={toggleAddAccountDialog}
          />
        )}
        openPopup={openAddAccountDialog}
        togglePopup={toggleAddAccountDialog}
        title={t('add_account')}
        maxWidth="md"
      />
    </>
  );
};

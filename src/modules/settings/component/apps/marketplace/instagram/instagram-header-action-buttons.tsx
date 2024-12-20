import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IInstagramConfigDetails } from 'modules/settings/apis/marketplace/instagram';
import {
  AddInstagramConfigurationContainer,
  EditInstagramConfigurationContainer,
} from 'modules/settings/containers/marketplace/instagram';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { AddAppConfigurationDialog } from '../add-app-configuration-dialog';
import { DeleteInstagramConfiguration } from './delete-instagram-configuration';

interface InstagramHeaderActionButtonsProps {
  data: IInstagramConfigDetails;
}

export const InstagramHeaderActionButtons = (
  props: InstagramHeaderActionButtonsProps
) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const toggleDialog = useCallback(() => {
    setOpenDialog((prevValue) => !prevValue);
  }, []);

  const toggleEditDialog = useCallback(() => {
    setOpenEditDialog((prevValue) => !prevValue);
  }, []);

  const isInstalled = useMemo(
    () => Object.keys(props.data).length > 0,
    [props.data]
  );

  const handleOnClick = () => {
    window.open(
      `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${import.meta.env.VITE_INSTAGRAM_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SUB_DOMAIN}configurations/marketplace/instagram&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments`,
      '_self'
    );
  };
  useEffect(() => {
    if (code) {
      setOpenDialog(true);
    }
  }, [code]);

  return (
    <>
      <FlexBox gap={'10px'} height="fit-content">
        {isInstalled ? (
          <>
            <Button variant="outlined" size="medium" onClick={toggleEditDialog}>
              {t('edit_account')}
            </Button>
            <DeleteInstagramConfiguration />
            <Button
              variant="contained"
              size="medium"
              onClick={handleOnClick}
              startIcon={<Login />}
            >
              {t('re_authenticate')}
            </Button>
          </>
        ) : code ? (
          <>
            <Button variant="outlined" size="medium" onClick={toggleDialog}>
              {t('add_account')}
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={handleOnClick}
              startIcon={<Login />}
            >
              {t('re_authenticate')}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            size="medium"
            onClick={handleOnClick}
            endIcon={<Login />}
          >
            {t('authenticate')}
          </Button>
        )}
      </FlexBox>
      <AddAppConfigurationDialog
        dialogContent={() => (
          <AddInstagramConfigurationContainer
            toggleAddPageDialog={toggleDialog}
            code={code!}
          />
        )}
        openPopup={openDialog}
        togglePopup={toggleDialog}
        title={t('add_instagram_configuration')}
        maxWidth="md"
      />
      <AddAppConfigurationDialog
        dialogContent={() => (
          <EditInstagramConfigurationContainer
            toggleAddPageDialog={toggleEditDialog}
            data={props.data}
          />
        )}
        openPopup={openEditDialog}
        togglePopup={toggleEditDialog}
        title={t('edit_instagram_configuration')}
        maxWidth="md"
      />
    </>
  );
};

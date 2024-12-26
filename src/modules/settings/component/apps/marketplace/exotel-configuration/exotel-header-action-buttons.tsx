import { Edit, GetApp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { BackButton, FlexBox } from 'lib/ui-ux';
import { IExotelConfigDetails } from 'modules/settings/apis/marketplace/exotel';
import {
  UpdateExotelConfigContainer,
  AddExotelConfigurationContainer,
} from 'modules/settings/containers/marketplace/exotel';
import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AddAppConfigurationDialog } from '../add-app-configuration-dialog';
import { DeleteExotelConfigurations } from './delete-exotel-configurations';
import { AddExophoneNumberDialog } from './manage-exotel-numbers';

interface ExotelHeaderActionButtonsProps {
  data?: IExotelConfigDetails | null;
  showManageContent: boolean;
  updateInstallation: () => void;
  toggleManageDisplay: () => void;
}

export const ExotelHeaderActionButtons = (
  props: ExotelHeaderActionButtonsProps
) => {
  const { t } = useTranslation();
  const { toggleManageDisplay, showManageContent } = props;
  const [openPopup, setOpenPopup] = useState(false);

  const togglePopup = useCallback(() => {
    setOpenPopup((prevValue) => !prevValue);
  }, []);

  const [openExophonePopup, setOpenExophonePopup] = useState(false);

  const toggleExophonePopup = useCallback(() => {
    setOpenExophonePopup((prevValue) => !prevValue);
  }, []);

  const isInstalled = useMemo(
    () => Object.keys(props?.data ?? {}).length > 0,
    [props.data]
  );

  const appConfigDialogContent = () => {
    return isInstalled ? (
      <UpdateExotelConfigContainer togglePopup={togglePopup} />
    ) : (
      <AddExotelConfigurationContainer
        togglePopup={togglePopup}
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
                onClick={toggleExophonePopup}
              >
                {t('add_exotel_number')}
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
              <DeleteExotelConfigurations />
              <Button
                variant="contained"
                size="medium"
                startIcon={<Edit />}
                onClick={togglePopup}
              >
                {t('edit')}
              </Button>
            </>
          )
        ) : (
          <Button
            variant="contained"
            size="medium"
            onClick={togglePopup}
            endIcon={<GetApp />}
          >
            {t('install')}
          </Button>
        )}
      </FlexBox>
      <AddAppConfigurationDialog
        dialogContent={() => appConfigDialogContent()}
        openPopup={openPopup}
        togglePopup={togglePopup}
        title={'Exotel Configuration'}
        maxWidth="md"
      />
      <AddExophoneNumberDialog
        openAddExoPopup={openExophonePopup}
        toggleAddExoPopup={toggleExophonePopup}
      />
    </>
  );
};

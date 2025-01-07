import { AddCircleOutline, ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import {
  BreadCrumbs,
  CustomIconButton,
  DrawerExtended,
  FlexBox,
  MoreInformation,
} from 'lib/ui-ux';
import { CannedResponse } from 'modules/settings/apis/canned-response';
import { CreateCannedResponseContainer } from 'modules/settings/containers/canned-response';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { CannedResponseList } from './canned-response-list';

interface IAddNewCannedResponseProps {
  openAddStatusDrawer: boolean;
  cannedResponseData?: CannedResponse[];
  toggleAddStatusDrawer: () => void;
}

const AddNewCannedResponse = (props: IAddNewCannedResponseProps) => {
  const { openAddStatusDrawer, cannedResponseData, toggleAddStatusDrawer } =
    props;

  return (
    <DrawerExtended
      width="500px"
      header={t('add_canned_response')}
      anchor="right"
      open={openAddStatusDrawer}
      onRenderContent={() => (
        <CreateCannedResponseContainer
          toggleAddStatusDrawer={toggleAddStatusDrawer}
          cannedResponseData={cannedResponseData}
        />
      )}
      onClose={toggleAddStatusDrawer}
    />
  );
};

interface ICannedResponseLayoutProps {
  data: CannedResponse[] | undefined;
  isLoading: boolean;
}

export const CannedResponseLayout = (props: ICannedResponseLayoutProps) => {
  const [openAddStatusDrawer, setOpenAddStatusDrawer] = React.useState(false);
  const navigate = useNavigate();

  const toggleAddStatusDrawer = useCallback(() => {
    setOpenAddStatusDrawer((prevValue) => !prevValue);
  }, []);

  return (
    <FlexBox
      width="100%"
      height="100%"
      padding="20px"
      gap={'10px'}
      flexDirection="column"
    >
      <BreadCrumbs />
      <MoreInformation information={t('canned_response_long_description')} />
      <FlexBox
        width="100%"
        justifyContent="space-between"
        padding="10px"
        alignItems="center"
      >
        <FlexBox alignItems="center" gap="10px">
          <CustomIconButton
            onClick={() => {
              navigate('/configurations');
            }}
            iconComponent={<ArrowBack />}
            tooltipProps={{ title: t('back') }}
          />
          <Typography variant="h5">{t('canned_response')}</Typography>
        </FlexBox>
        <Button
          variant="contained"
          onClick={toggleAddStatusDrawer}
          startIcon={<AddCircleOutline />}
        >
          {t('add_canned_response')}
        </Button>
        <AddNewCannedResponse
          openAddStatusDrawer={openAddStatusDrawer}
          toggleAddStatusDrawer={toggleAddStatusDrawer}
          cannedResponseData={props.data}
        />
      </FlexBox>
      <CannedResponseList
        isLoading={props.isLoading}
        cannedResponseData={props.data}
      />
    </FlexBox>
  );
};

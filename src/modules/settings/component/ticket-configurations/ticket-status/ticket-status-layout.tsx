import { AddCircleOutline, ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import {
  BreadCrumbs,
  CustomIconButton,
  DrawerExtended,
  FlexBox,
} from 'lib/ui-ux';
import { IFetchAllStatuses } from 'modules/settings/apis/ticket-status';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { TicketStatusList } from 'modules/settings/component/ticket-configurations/ticket-status';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CreateTicketStatusContainer } from '../../../containers/ticket-status/create-ticket-status-container';

interface IAddNewTicketStatusProps {
  openAddStatusDrawer: boolean;
  statusData?: IGenericResponse[];
  toggleAddStatusDrawer: () => void;
}

const AddNewTicketStatus = (props: IAddNewTicketStatusProps) => {
  const { openAddStatusDrawer, statusData, toggleAddStatusDrawer } = props;
  const { t } = useTranslation();

  return (
    <DrawerExtended
      width="500px"
      header={t('add_ticket_label')}
      anchor="right"
      open={openAddStatusDrawer}
      onRenderContent={() => (
        <CreateTicketStatusContainer
          toggleAddStatusDrawer={toggleAddStatusDrawer}
          statusData={statusData}
        />
      )}
      onClose={toggleAddStatusDrawer}
    />
  );
};

interface ITicketStatusLayoutProps {
  data: IFetchAllStatuses[] | undefined;
  isLoading: boolean;
}

export const TicketStatusLayout = (props: ITicketStatusLayoutProps) => {
  const [openAddStatusDrawer, setOpenAddStatusDrawer] = React.useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const toggleAddStatusDrawer = useCallback(() => {
    setOpenAddStatusDrawer((prevValue) => !prevValue);
  }, []);

  return (
    <FlexBox width="100%" flexDirection="column">
      <BreadCrumbs />
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
          <Typography variant="h5">{t('add_ticket_label')}</Typography>
        </FlexBox>
        <Button
          variant="contained"
          onClick={toggleAddStatusDrawer}
          startIcon={<AddCircleOutline />}
        >
          {t('add_ticket_label')}
        </Button>
        <AddNewTicketStatus
          openAddStatusDrawer={openAddStatusDrawer}
          toggleAddStatusDrawer={toggleAddStatusDrawer}
          statusData={props.data}
        />
      </FlexBox>
      <TicketStatusList isLoading={props.isLoading} statusData={props.data} />
    </FlexBox>
  );
};

import { ArrowBack, AddCircleOutline } from '@mui/icons-material';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import {
  BreadCrumbs,
  CustomIconButton,
  DrawerExtended,
  FlexBox,
  MoreInformation,
  a11yProps,
} from 'lib/ui-ux';
import { UserType } from 'modules/settings/apis/users-and-permissions';
import { CreateNewAgentContainer } from 'modules/settings/containers';
import { GetAgentsContainer } from 'modules/settings/containers/agents/get-agents-container';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AddNewAgent = (props: {
  openAddUserDrawer: boolean;
  toggleAddUserDrawer: () => void;
}) => {
  const { openAddUserDrawer, toggleAddUserDrawer } = props;
  const { t } = useTranslation();
  return (
    <DrawerExtended
      width="500px"
      header={t('add_new_agent')}
      anchor="right"
      open={openAddUserDrawer}
      onRenderContent={() => (
        <CreateNewAgentContainer toggleAddUserDrawer={toggleAddUserDrawer} />
      )}
      onClose={toggleAddUserDrawer}
    />
  );
};

export default function AgentsLayout() {
  const [openAddUserDrawer, setOpenAddUserDrawer] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleAddUserDrawer = useCallback(() => {
    setOpenAddUserDrawer((prevValue) => !prevValue);
  }, []);

  const [value, setValue] = React.useState<UserType>('active');

  const handleChange = (_event: React.SyntheticEvent, newValue: UserType) => {
    setValue(newValue);
  };

  return (
    <FlexBox width="100%" height="100%" flexDirection="column">
      <BreadCrumbs />
      <FlexBox
        padding="20px"
        gap={'20px'}
        flexDirection="column"
        height="calc(100% - 46px)"
      >
        <MoreInformation information={t('agents_long_description')} />
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
            <Typography variant="h5">{t('agents')}</Typography>
          </FlexBox>
          <Button
            variant="contained"
            onClick={toggleAddUserDrawer}
            startIcon={<AddCircleOutline />}
          >
            {t('add_agents')}
          </Button>
          <AddNewAgent
            openAddUserDrawer={openAddUserDrawer}
            toggleAddUserDrawer={toggleAddUserDrawer}
          />
        </FlexBox>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t('active')} value="active" {...a11yProps(0)} />
          <Tab label={t('all')} value="all" {...a11yProps(1)} />
          <Tab label={t('verified')} value="verified" {...a11yProps(2)} />
          <Tab label={t('unverified')} value="unverified" {...a11yProps(3)} />
          <Tab label={t('deactivated')} value="deactivated" {...a11yProps(4)} />
        </Tabs>
        <GetAgentsContainer type={value} />
      </FlexBox>
    </FlexBox>
  );
}

import { Edit } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { FlexBox, HorizontalSeparator, StyledTab, StyledTabs } from 'lib/ui-ux';
import { chooseRandomColors, getInitialsByName } from 'lib/utils';
import { Status } from 'modules/core/components/parts/agent-status';
import {
  useEditProfile,
  useFetchCurrentStatus,
} from 'modules/settings/apis/users-and-permissions';
import React, { ChangeEvent, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { ChangePassword, RolesPermissionsTab, Signature } from '.';
import { General } from './general';

const StyledLayoutPage = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
`;

const StyledFlexbox = styled(FlexBox)`
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  border: ${({ theme }) => theme.semantics.standardBorder};
  background-color: ${({ theme }) => theme.pallete.white};
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const EditIconButton = styled(IconButton)`
  && {
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    padding: 4px;
    &:hover {
      background: #f0f0f0;
    }
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomerAvatar = (props: {
  customerName: string;
  profile_picture?: string;
}) => {
  const { customerName, profile_picture } = props;
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(getInitialsByName(customerName)),
    [customerName]
  );
  const { mutateAsync } = useEditProfile();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result?.toString();
        if (base64String) {
          mutateAsync({
            profile_picture: base64String,
          });
        }
      };
    }
  };

  return (
    <FlexBox
      flexDirection="row"
      width="100%"
      alignItems="center"
      padding="30px 0"
    >
      <HorizontalSeparator />
      <AvatarContainer>
        <Avatar
          sx={{
            color: textColor,
            bgcolor: backgroundColor,
            width: '120px',
            height: '120px',
            fontSize: '4rem',
            textDecoration: 'uppercase',
          }}
          src={profile_picture}
        >
          {getInitialsByName(customerName).toLocaleUpperCase()}
        </Avatar>
        <label htmlFor="avatar-upload">
          <EditIconButton size="small" component="span">
            <Edit fontSize="small" />
          </EditIconButton>
        </label>
        <HiddenFileInput
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
      </AvatarContainer>
      <HorizontalSeparator />
    </FlexBox>
  );
};

const ProfileHeader = () => {
  const config = useAppSelector((state) => state.core.config);
  const { data: currentStatus } = useFetchCurrentStatus();

  return (
    <StyledFlexbox style={{ flex: '1' }} height="400px">
      <FlexBox gap="12px" flexDirection="column" width="100%">
        <CustomerAvatar
          customerName={config?.user_details.display_name || ''}
          profile_picture={config?.user_details?.image_url}
        />
        <FlexBox flexDirection="column" padding="0 0 0 20px" gap="6px">
          <Typography variant="h5">
            {config?.user_details.display_name}
          </Typography>
          <Typography variant="caption">
            {config?.user_details.email}
          </Typography>
          {config?.user_details.phone_number ? (
            <Typography variant="caption">
              {config?.user_details.phone_number}
            </Typography>
          ) : null}

          <FlexBox
            style={{ textTransform: 'unset', gap: '6px' }}
            flexDirection="row"
            alignItems="center"
          >
            <Status $status={currentStatus?.name} />
            <Typography variant="h6">{currentStatus?.name}</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StyledFlexbox>
  );
};

function tabAriaProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProfileDetails = () => {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderByvalue = () => {
    switch (value) {
      case 0:
        return <General />;
      case 1:
        return <RolesPermissionsTab />;
      case 2:
        return <ChangePassword />;
      case 3:
        return <Signature />;
      default:
        return null;
    }
  };

  return (
    <StyledFlexbox style={{ flex: '5' }}>
      <FlexBox flexDirection="column" width="100%">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs
            whitebackground
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ textTransform: 'unset' }}
          >
            <StyledTab
              label={t('general')}
              {...tabAriaProps(0)}
              sx={{ textTransform: 'unset' }}
            />
            <StyledTab
              label={t('roles_and_permissions')}
              {...tabAriaProps(0)}
              sx={{ textTransform: 'unset' }}
            />
            <StyledTab
              label={t('change_password')}
              {...tabAriaProps(0)}
              sx={{ textTransform: 'unset' }}
            />
            <StyledTab
              label={t('signature')}
              {...tabAriaProps(0)}
              sx={{ textTransform: 'unset' }}
            />
          </StyledTabs>
        </Box>
        {renderByvalue()}
      </FlexBox>
    </StyledFlexbox>
  );
};

export const UserProfileLayout = () => {
  return (
    <StyledLayoutPage
      width="100%"
      height="100%"
      flexDirection="column"
      gap="14px"
      padding="24px"
    >
      <Typography variant="h4" textTransform={'capitalize'}>
        <Trans i18nKey={'user_profile'} />
      </Typography>
      <FlexBox gap="20px" width="100%" height="calc(100% - 40px)">
        <ProfileHeader />
        <ProfileDetails />
      </FlexBox>
    </StyledLayoutPage>
  );
};

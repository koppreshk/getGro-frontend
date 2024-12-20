import { Typography } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { Trans } from 'react-i18next';
import styled, { useTheme } from 'styled-components';

import { DashboardCategoriesPanel } from './parts/categories-panel';

const StyledFlexbox = styled(FlexBox)`
  /* background-color: ${(props) => props.theme.pallete.white}; */
`;

export const DashboardLayout = () => {
  return (
    <FlexBox flexDirection="column" height="100%" width="100%" overflowY="auto">
      <UserDetails />
      <DashboardCategoriesPanel />
    </FlexBox>
  );
};

const UserDetails = () => {
  const config = useAppSelector((state) => state.core.config);
  const { pallete } = useTheme();
  return (
    <StyledFlexbox flexDirection="column" gap="5px" padding="25px 25px 0px">
      <Typography variant="h2" textTransform={'capitalize'}>
        <Trans i18nKey="hi" /> {config?.user_details.display_name}
      </Typography>
      <Typography variant="h6" sx={{ color: pallete.grayVariant2 }}>
        <Trans i18nKey="welcome_back" />
      </Typography>
    </StyledFlexbox>
  );
};

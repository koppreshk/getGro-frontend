import { Alert } from '@mui/material';
import { useModule } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

import { DashboardLayout } from '../components';

const StyledDashboardPage = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
`;

export default function DashboardPage() {
  const isDashboardPageAccessible = useModule('dashboards');

  return (
    <>
      {isDashboardPageAccessible ? (
        <StyledDashboardPage
          width="100%"
          height="100%"
          gap="15px"
          flexDirection="column"
        >
          <DashboardLayout />
        </StyledDashboardPage>
      ) : (
        <FlexBox
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="warning">
            <Trans i18nkey="access_denied_message" />
          </Alert>
        </FlexBox>
      )}
    </>
  );
}

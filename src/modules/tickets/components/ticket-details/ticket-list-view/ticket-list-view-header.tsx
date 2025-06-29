import { ArrowBack } from '@mui/icons-material/';
import { Typography } from '@mui/material';
import { CustomIconButton, FlexBox, RefreshButton } from 'lib/ui-ux';
import { convertToUnderscore } from 'lib/utils';
import { AdvanceSearchContainer } from 'modules/tickets/containers';
import { Trans, useTranslation } from 'react-i18next';
import { useMatch, useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import { TicketViewActionButtons } from '.';

export const HeaderWrapper = styled(FlexBox)`
  box-sizing: border-box;
  padding: 15px 10px;
  border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const TicketListViewHeader = () => {
  const match = useMatch('/tickets/:ticketType/:ticketId');
  const header = convertToUnderscore(match?.params.ticketType || '');
  const ticketType = match?.params.ticketType;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleBackClick = () => {
    const search = location.search;
    if (ticketType) {
      navigate(`/tickets/${ticketType}${search}`);
    } else {
      navigate('/tickets' + search);
    }
  };

  return (
    <HeaderWrapper width="100%" justifyContent="space-between">
      <FlexBox>
        <CustomIconButton
          onClick={handleBackClick}
          iconComponent={<ArrowBack />}
          tooltipProps={{ title: t('back') }}
        />
        <FlexBox alignItems="center" gap="5px">
          <Typography variant="h5">
            <Trans i18nKey={`${header}`} />
          </Typography>
          <FlexBox>
            <RefreshButton />
            <AdvanceSearchContainer />
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <TicketViewActionButtons />
    </HeaderWrapper>
  );
};

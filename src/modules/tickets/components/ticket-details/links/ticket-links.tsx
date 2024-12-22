import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { LinkedTickets } from 'modules/tickets/apis';
import { Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.grayVariant5};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.sm};
  height: 48px;
  padding: 0 20px;
  align-items: center;
`;

export const TicketLinks = (props: { data: LinkedTickets[] }) => {
  const { data } = props;
  const location = useLocation();

  const getURL = (ticketId: number) => {
    const pathNameParts = location.pathname.split('/');
    pathNameParts[3] = ticketId.toString();
    return `${pathNameParts.join('/')}${location.search}`;
  };

  return (
    <FlexBox
      flexDirection="column"
      width="100%"
      style={{ border: '1px solid #f1f2f4' }}
    >
      <StyledContainer>
        <FlexBox gap={'10px'} alignItems="center">
          <ConfirmationNumberOutlined />
          <Typography variant="h6">
            <Trans i18nKey="related_tickets" />
          </Typography>
        </FlexBox>
      </StyledContainer>
      <FlexBox flexDirection="column">
        {data.length ? (
          data.map((item) => (
            <FlexBox key={item.ticket_id} padding="20px" gap={'10px'}>
              <Link to={getURL(item.ticket_id)} target="_blank">
                <Typography
                  variant="body2"
                  sx={{ width: '80px' }}
                  color={'#6969ff'}
                >
                  {'#' + item.ticket_id}
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ width: 'calc(100% - 90px)' }}>
                {item.description}
              </Typography>
              <Typography variant="body2">{item.status}</Typography>
            </FlexBox>
          ))
        ) : (
          <FlexBox padding="20px">
            <Typography variant="body2">
              <Trans i18nKey="no_tickets_found" />
            </Typography>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};

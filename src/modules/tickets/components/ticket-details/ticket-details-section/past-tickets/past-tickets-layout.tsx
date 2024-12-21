import { Sort } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { ITicketDetails } from 'modules/tickets/apis';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import { CommonHeader } from '../common-header';
import { PastTicketCard } from './past-ticket-card';

interface IPastTicketsLayoutProps {
  pastTickets: ITicketDetails[];
}

const LayoutContainer = styled(FlexBox)`
  .parent-container:last-child {
    .child-container {
      margin-bottom: 0;
    }
  }
`;

const PastTickets = (props: IPastTicketsLayoutProps) => {
  const { pastTickets } = props;
  const { pathname, search } = useLocation();
  const [isAcscending, setSortOrder] = React.useState(false);
  const sortedPastTickets = useMemo(
    () =>
      isAcscending
        ? pastTickets
            .slice()
            .sort(
              (a, b) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
            )
        : pastTickets,
    [isAcscending, pastTickets]
  );

  const onPastTicketClick = (ticketId: number) => {
    const pathNameParts = pathname.split('/');
    pathNameParts[3] = ticketId.toString();
    window.open(`${pathNameParts.join('/')}${search}`);
  };

  const onSortOrder = () => {
    setSortOrder((preValue) => !preValue);
  };
  const renderFarPositionedItems = () => {
    return (
      <CustomIconButton
        tooltipProps={{ title: 'Sort By Created Date' }}
        iconComponent={
          <Sort sx={{ transform: isAcscending ? 'rotate(180deg)' : 'unset' }} />
        }
        onClick={onSortOrder}
      />
    );
  };
  return (
    <>
      <CommonHeader
        headerName="Past Tickets"
        renderFarPositionedItems={renderFarPositionedItems}
      />
      <LayoutContainer
        padding="8px"
        flexDirection="column"
        height="calc(100% - 72px)"
      >
        {sortedPastTickets.length ? (
          sortedPastTickets.map((item, idx) => (
            <PastTicketCard
              key={idx}
              item={item}
              onPastTicketClick={onPastTicketClick}
            />
          ))
        ) : (
          <FlexBox alignItems="center" justifyContent="center" height="100%">
            <Typography>No past tickets found</Typography>
          </FlexBox>
        )}
      </LayoutContainer>
    </>
  );
};

export const PastTicketsLayout = (props: IPastTicketsLayoutProps) => {
  const { pastTickets } = props;
  return (
    <>
      <PastTickets pastTickets={pastTickets} />
    </>
  );
};

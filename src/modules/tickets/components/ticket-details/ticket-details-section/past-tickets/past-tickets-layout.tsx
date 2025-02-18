import { Sort } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { ITicketDetails } from 'modules/tickets/apis';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { styled } from 'styled-components';

import { CommonHeader } from '../common-header';
import { PastTicketCard } from './past-ticket-card';

interface IPastTicketsLayoutProps {
  pastTickets: ITicketDetails[];
}

const LayoutContainer = styled(FlexBox)`
  flex: 1;
  height: calc(100% - 72px);
  overflow: hidden; /* Prevent parent from scrolling */
`;

const ListWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto; /* Allow list scrolling */
`;

const PastTickets = ({ pastTickets }: IPastTicketsLayoutProps) => {
  const { pathname, search } = useLocation();
  const [isAcscending, setSortOrder] = useState(false);
  const { t } = useTranslation();
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState(400); // Default height

  // Update height dynamically based on parent container
  useEffect(() => {
    if (!listContainerRef.current) return;

    const updateHeight = () => {
      setListHeight(listContainerRef.current?.clientHeight || 400);
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(listContainerRef.current);

    updateHeight(); // Initial height update

    return () => observer.disconnect();
  }, []);

  const sortedPastTickets = useMemo(
    () =>
      isAcscending
        ? [...pastTickets].sort(
            (a, b) =>
              new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
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
    setSortOrder((prev) => !prev);
  };

  const renderFarPositionedItems = () => (
    <CustomIconButton
      tooltipProps={{ title: 'Sort By Created Date' }}
      iconComponent={
        <Sort sx={{ transform: isAcscending ? 'rotate(180deg)' : 'unset' }} />
      }
      onClick={onSortOrder}
    />
  );

  // Render function for react-window
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <PastTicketCard
        item={sortedPastTickets[index]}
        onPastTicketClick={onPastTicketClick}
      />
    </div>
  );

  return (
    <>
      <CommonHeader
        headerName={t('past_tickets')}
        renderFarPositionedItems={renderFarPositionedItems}
      />
      <LayoutContainer>
        <ListWrapper ref={listContainerRef}>
          {sortedPastTickets.length ? (
            <List
              height={listHeight} // Dynamically set height
              itemCount={sortedPastTickets.length}
              itemSize={87} // Adjust this based on estimated row height
              width="100%"
            >
              {Row}
            </List>
          ) : (
            <FlexBox alignItems="center" justifyContent="center" height="100%">
              <Typography>{t('no_past_tickets_found')}</Typography>
            </FlexBox>
          )}
        </ListWrapper>
      </LayoutContainer>
    </>
  );
};

export const PastTicketsLayout = (props: IPastTicketsLayoutProps) => {
  return <PastTickets pastTickets={props.pastTickets} />;
};

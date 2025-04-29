import { Avatar, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'lib/hooks';
import { FlexBox, NewMessageIndicator } from 'lib/ui-ux';
import { chooseRandomColors, isToday, isYesterday } from 'lib/utils';
import { DateTime } from 'luxon';
import { ITicketDetails } from 'modules/tickets/apis';
import { useSourceIcon } from 'modules/tickets/hooks';
import { setTicketDetails, setTicketsList } from 'modules/tickets/storage';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { styled, css, useTheme } from 'styled-components';

import { useTicketsListSocket } from '../../tickets-by-view';

interface ITicketListProps {
  data: ITicketDetails[];
  isLoading?: boolean;
}

const TickListWrapper = styled(FlexBox)`
  height: calc(100% - 65px);
  overflow: auto;
`;

const TicketWrapper = styled(FlexBox)<{ $isTicketActive: boolean }>`
  padding: 15px 10px 15px 15px;
  border-bottom: ${({ theme }) => theme.semantics.standardBorder};
  cursor: pointer;

  ${({ $isTicketActive }) =>
    $isTicketActive &&
    css`
      background-color: ${(props) => props.theme.pallete.purpleLight};
      border-left-width: 4px;
      border-style: solid;
      border-color: ${(props) => props.theme.pallete.primaryPurple};
      border-width: 0;
      border-left-width: thick;
    `}

  &:hover {
    background-color: ${(props) =>
      props.$isTicketActive
        ? props.theme.pallete.purpleLight
        : props.theme.pallete.grayVariant5};
  }
`;

const TicketDetailsSectionRight = styled(FlexBox)`
  margin-left: 15px;
  width: calc(100% - 55px);
`;

const StyledTypography = styled(Typography)`
  && {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${(props) => props.theme.pallete.grayNeutral};
  }
`;

interface ITicketDetailsProps extends ITicketDetails {}

const TicketDetails = (props: ITicketDetailsProps) => {
  const {
    updatedAt,
    customerName,
    ticketId,
    description,
    createdFrom,
    has_read,
  } = props;
  const params = useParams();
  const navigate = useNavigate();
  const match = useMatch(`/tickets/:ticketType/:ticketId`);
  const isTicketActive = React.useMemo(
    () => params.ticketId === ticketId.toString(),
    [params.ticketId, ticketId]
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const noOfRecords = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const dispatch = useAppDispatch();
  const getSourceIcon = useSourceIcon();
  const { pallete } = useTheme();
  const ticketsList = useAppSelector((state) => state.tickets.ticketsList);

  React.useEffect(() => {
    if (params.ticketId === ticketId.toString() && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });

      dispatch(
        setTicketDetails({
          ...props,
        })
      );
    }
  }, [dispatch, params.ticketId, props, ticketId]);

  const onTicketClick = React.useCallback(() => {
    const mappedData = [...ticketsList].map((ticket) => {
      if (ticket.ticketId === ticketId) {
        return { ...ticket, has_read: true };
      }
      return ticket;
    });
    dispatch(setTicketsList(mappedData));
    navigate(
      `/tickets/${match?.params.ticketType}/${ticketId}?${createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber! })}`
    );
  }, [
    dispatch,
    match?.params.ticketType,
    navigate,
    noOfRecords,
    pageNumber,
    ticketId,
    ticketsList,
  ]);

  const isoDate = DateTime.fromFormat(updatedAt, 'yyyy-LL-dd hh:mm a').toISO();
  const time = DateTime.fromISO(isoDate!).toFormat('hh:mm a');
  const { t } = useTranslation();
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(customerName || ''),
    [customerName]
  );

  return (
    <TicketWrapper
      flexDirection="row"
      $isTicketActive={isTicketActive}
      ref={ref}
      onClick={onTicketClick}
    >
      <FlexBox justifyContent="center" alignItems="center">
        <Avatar
          sx={{ fontSize: '14px', color: textColor, bgcolor: backgroundColor }}
        >
          {customerName
            ? customerName?.split(' ').length > 1
              ? customerName
                  .split(' ')
                  .map((name) => name[0])
                  .join('')
              : customerName.slice(0, 2)
            : ''}
        </Avatar>
      </FlexBox>
      <TicketDetailsSectionRight flexDirection="column" gap="4px">
        <FlexBox justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: 'calc(100% - 125px)',
              textWrap: 'nowrap',
            }}
          >
            {customerName}
          </Typography>
          <FlexBox gap="8px" alignItems="baseline">
            <Typography
              variant="caption"
              title={t('last_updated')}
              sx={{ color: pallete.grayNeutral }}
            >
              {isToday(isoDate!)
                ? `${t('today')}, ${time}`
                : isYesterday(isoDate!)
                  ? `${t('yesterday')}, ${time}`
                  : updatedAt}
            </Typography>
            {has_read ? null : (
              <Tooltip title={t('view_new_message')}>
                <NewMessageIndicator />
              </Tooltip>
            )}
          </FlexBox>
        </FlexBox>
        <StyledTypography variant="body2" title={description}>
          {description}
        </StyledTypography>
        <FlexBox flexDirection="row" gap="10px" alignItems="center">
          <>{getSourceIcon(createdFrom)}</>
          <StyledTypography variant="body2">Id: {ticketId}</StyledTypography>
        </FlexBox>
      </TicketDetailsSectionRight>
    </TicketWrapper>
  );
};

export const TicketList = (props: ITicketListProps) => {
  const { data } = props;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const match = useMatch(`/tickets/:ticketType/:ticketId`);
  const [searchParams] = useSearchParams();
  const noOfRecords = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const searchText = searchParams.get('searchText');

  const ticketList = useAppSelector((state) => state.tickets.ticketsList);

  useEffect(() => {
    if (data) {
      dispatch(setTicketsList(data));
    }
  }, [dispatch, data]);
  useTicketsListSocket();

  const doesTicketIdExist = useMemo(
    () => data.some((item) => item.ticketId.toString() === params.ticketId),
    [data, params.ticketId]
  );

  useEffect(() => {
    if (!doesTicketIdExist) {
      if (data[0]) {
        return navigate(
          `/tickets/${match?.params.ticketType}/${data[0].ticketId}?${searchText ? createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber!, searchText: searchText }) : createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber! })}`
        );
      }
      return navigate(
        `/tickets/${match?.params.ticketType}?${searchText ? createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber!, searchText: searchText }) : createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber! })}`
      );
    }
  }, [
    data,
    doesTicketIdExist,
    match?.params.ticketType,
    navigate,
    noOfRecords,
    pageNumber,
    searchText,
  ]);

  const ticketViewDetails = ticketList.map((item) => (
    <TicketDetails key={item.ticketId} {...item} />
  ));

  return (
    <TickListWrapper flexDirection="column">
      {ticketViewDetails}
    </TickListWrapper>
  );
};

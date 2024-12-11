import { Avatar, Typography } from '@mui/material';
import { useAppDispatch } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { isToday, isYesterday } from 'lib/utils';
import { DateTime } from 'luxon';
import { ITicketDetails } from 'modules/tickets/apis';
import { useSourceIcon } from 'modules/tickets/hooks';
import { setTicketDetails } from 'modules/tickets/storage';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';

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
    createdAt,
    customerName,
    ticketId,
    source,
    priority,
    ticketStatus,
    assigneeInfo,
    pastTickets,
    customerInfo,
    channelId,
    resolutionDue,
    responseDue,
    statusUpdateString,
    closedAt,
    description,
    tags,
    shopifyCustomerId,
    createdFrom,
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

  React.useEffect(() => {
    if (params.ticketId === ticketId.toString() && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });

      dispatch(
        setTicketDetails({
          source,
          ticketId,
          customerName,
          ticketStatus,
          createdAt,
          priority,
          assigneeInfo,
          pastTickets,
          customerInfo,
          channelId,
          responseDue,
          resolutionDue,
          statusUpdateString,
          closedAt,
          description,
          tags,
          shopifyCustomerId,
          createdFrom,
        })
      );
    }
  }, [
    customerInfo,
    createdAt,
    customerName,
    dispatch,
    params.ticketId,
    priority,
    source,
    ticketId,
    ticketStatus,
    pastTickets,
    channelId,
    responseDue,
    resolutionDue,
    assigneeInfo,
    statusUpdateString,
    closedAt,
    description,
    tags,
    shopifyCustomerId,
    createdFrom,
  ]);

  const onTicketClick = React.useCallback(() => {
    navigate(
      `/tickets/${match?.params.ticketType}/${ticketId}?${createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber! })}`
    );
  }, [match?.params.ticketType, navigate, noOfRecords, pageNumber, ticketId]);

  const isoDate = DateTime.fromFormat(createdAt, 'yyyy-LL-dd hh:mm a').toISO();
  const time = DateTime.fromISO(isoDate!).toFormat('hh:mm a');
  const { t } = useTranslation();
  return (
    <TicketWrapper
      flexDirection="row"
      $isTicketActive={isTicketActive}
      ref={ref}
      onClick={onTicketClick}
    >
      <FlexBox justifyContent="center" alignItems="center">
        <Avatar />
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
          <Typography
            variant="caption"
            title="Created At"
            sx={{ color: pallete.grayNeutral }}
          >
            {isToday(isoDate!)
              ? `${t('today')}, ${time}`
              : isYesterday(isoDate!)
                ? `${t('yesterday')}, ${time}`
                : createdAt}
          </Typography>
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
  const match = useMatch(`/tickets/:ticketType/:ticketId`);
  const [searchParams] = useSearchParams();
  const noOfRecords = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');

  const doesTicketIdExist = useMemo(
    () => data.some((item) => item.ticketId.toString() === params.ticketId),
    [data, params.ticketId]
  );

  useEffect(() => {
    if (!doesTicketIdExist) {
      navigate(
        `/tickets/${match?.params.ticketType}/${data[0].ticketId}?${createSearchParams({ noOfRecords: noOfRecords!, pageNumber: pageNumber! })}`
      );
    }
  }, [
    data,
    doesTicketIdExist,
    match?.params.ticketType,
    navigate,
    noOfRecords,
    pageNumber,
  ]);

  const ticketViewDetails = data.map((item) => (
    <TicketDetails key={item.ticketId} {...item} />
  ));

  return (
    <TickListWrapper flexDirection="column">
      {ticketViewDetails}
    </TickListWrapper>
  );
};

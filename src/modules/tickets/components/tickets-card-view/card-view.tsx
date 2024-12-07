import { AccessTime, CalendarToday, SupportAgent } from '@mui/icons-material';
import { Avatar, Tooltip, Typography, SxProps, Chip } from '@mui/material';
import { useFeature } from 'lib/hooks';
import {
  CircularSeparator,
  FlexBox,
  TicketInfoContent,
  VerticalSeparator,
  StyledEllipsisTypography,
} from 'lib/ui-ux';
import {
  chooseRandomColors,
  getInitialsByName,
  useDateDifference,
} from 'lib/utils';
import { DateTime } from 'luxon';
import { ChatType } from 'modules/chats/apis';
import { useSourceIcon } from 'modules/tickets/hooks';
import React, { useCallback, useMemo } from 'react';
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ITicketDetails } from '../../apis';
import { TicketStatusContainer } from '../../containers';
import { Priority } from '../display-tickets-grid';

const StyledCard = styled(FlexBox)<{ $ticketStatus: string }>`
  background: ${({ theme }) => theme.pallete.white};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  border: 1px solid #f1f2f4;
  cursor: pointer;
  padding: 15px 20px 15px;
  margin: 0 20px;
  //experimenting this design
  ${({ $ticketStatus }) => {
    if ($ticketStatus === 'Closed') {
      return css`
        border-left: 3px solid #3ab43a;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `;
    }
  }}

  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const onRenderSeparator = () => {
  return <VerticalSeparator />;
};

const NameAndSourceContent = styled(FlexBox)`
  margin-top: 14px;
`;

const iconStyles: SxProps = { height: '16px', width: '16px', fill: '#787f83' };

const CustomerName = (props: Pick<ITicketDetails, 'customerName'>) => {
  const { customerName } = props;
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(getInitialsByName(customerName ?? 'NA')),
    [customerName]
  );

  return (
    <Avatar
      sx={{
        color: textColor,
        bgcolor: backgroundColor,
        width: '52px',
        height: '52px',
        fontSize: '20px',
        borderRadius: '20%',
      }}
    >
      {getInitialsByName(customerName ?? 'NA')}
    </Avatar>
  );
};

const CreatedAt = (props: Pick<ITicketDetails, 'createdAt'>) => {
  const parsedDate = DateTime.fromFormat(props.createdAt, 'yyyy-MM-dd hh:mm a');
  const diff = parsedDate.diffNow();

  const { days, hours, minutes, seconds } = diff
    .shiftTo('days', 'hours', 'minutes', 'seconds')
    .toObject();
  const parsedDateValue =
    Math.abs(days!) > 0
      ? `${Math.abs(days!)} days`
      : Math.abs(hours!) > 0
        ? `${Math.abs(hours!)} hours`
        : Math.abs(minutes!) > 0
          ? `${Math.abs(Math.round(minutes!))} mins`
          : `${Math.abs(Math.round(seconds!))} seconds`;

  return (
    <Tooltip title={`Created ${parsedDateValue} ago`}>
      <FlexBox gap={'10px'} alignItems="center" width="198px">
        <CalendarToday sx={iconStyles} />
        <TicketInfoContent variant="body2">{`Created ${parsedDateValue} ago`}</TicketInfoContent>
      </FlexBox>
    </Tooltip>
  );
};

const ResolutionDue = (props: Pick<ITicketDetails, 'resolutionDue'>) => {
  return (
    <Tooltip
      title={`Resolution time: ${props.resolutionDue ? props.resolutionDue : '--'}`}
    >
      <FlexBox gap={'10px'} alignItems="center" width="198px">
        <AccessTime sx={iconStyles} />
        <TicketInfoContent variant="body2">
          {props.resolutionDue ? props.resolutionDue : '--'}
        </TicketInfoContent>
      </FlexBox>
    </Tooltip>
  );
};

const AgentAssigned = (props: Pick<ITicketDetails, 'assigneeInfo'>) => {
  const { assigneeInfo } = props;

  const assignedAgentInfo = useCallback(
    () => (
      <>
        {assigneeInfo?.email ? (
          <FlexBox flexDirection="column">
            <Typography variant="subheading1">Assignee</Typography>
            <Typography variant="subheading1">
              Name: {assigneeInfo?.first_name} {assigneeInfo?.last_name ?? ''}
            </Typography>
            <Typography variant="subheading1">
              Email: {assigneeInfo?.email}
            </Typography>
          </FlexBox>
        ) : (
          '--'
        )}
      </>
    ),
    [assigneeInfo?.email, assigneeInfo?.first_name, assigneeInfo?.last_name]
  );

  return (
    <Tooltip title={assignedAgentInfo()}>
      <FlexBox gap={'10px'} alignItems="center" width="198px">
        <SupportAgent sx={iconStyles} />
        <TicketInfoContent variant="body2">
          {assigneeInfo?.email
            ? `${assigneeInfo?.first_name} ${assigneeInfo?.last_name ?? ''}`
            : '--'}
        </TicketInfoContent>
      </FlexBox>
    </Tooltip>
  );
};

const ResponseDueIndicator = (props: Pick<ITicketDetails, 'responseDue'>) => {
  const { responseDue } = props;
  const { dateColor, prefix, parsedDateString } = useDateDifference(
    responseDue!
  );
  return (
    <>
      <Tooltip title={`Response ${prefix} ${responseDue}`}>
        {<Chip label={parsedDateString} color={dateColor} size="small" />}
      </Tooltip>
    </>
  );
};

const getParsedChatType = (chatType: string) => {
  switch (chatType) {
    case ChatType.InstagramComment:
      return (
        <span>
          <b>instagram</b> post
        </span>
      );
    case ChatType.InstagramMessage:
      return (
        <span>
          <b>instagram message</b>
        </span>
      );
    case ChatType.FacebookPageMessage:
      return (
        <span>
          <b>facebook message</b>
        </span>
      );
    case ChatType.FacebookPageComment:
      return (
        <span>
          <b>facebook</b> post
        </span>
      );
    default:
      return (
        <span>
          <b>{chatType}</b>
        </span>
      );
  }
};

export const CardView = (props: ITicketDetails) => {
  const {
    ticketId,
    customerName,
    createdAt,
    ticketStatus,
    priority,
    description,
    resolutionDue,
    assigneeInfo,
    createdFrom,
    responseDue,
  } = props;
  const getSourceIcon = useSourceIcon();
  const navigate = useNavigate();
  const match = useMatch('/:tickets/:ticketType');
  const [searchParams] = useSearchParams();
  const noOfRecords = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const isFeatureAccessible = useFeature<undefined>();

  const onRowClick = React.useCallback(() => {
    navigate(
      `${match?.pathname}/${ticketId}?noOfRecords=${noOfRecords}&pageNumber=${pageNumber}`,
      { replace: true }
    );
  }, [match?.pathname, navigate, noOfRecords, pageNumber, ticketId]);

  return (
    <StyledCard
      $ticketStatus={ticketStatus}
      onClick={onRowClick}
      alignItems="center"
      justifyContent="space-between"
      width="calc(100% - 40px)"
    >
      <FlexBox alignItems="center" gap="18px" width="calc(100% - 210px)">
        <CustomerName customerName={customerName} />

        <FlexBox flexDirection="column" gap="14px" width="100%">
          <FlexBox flexDirection="column" width="calc(100% - 70px)">
            <Tooltip title={'Subject: ' + description} placement="bottom-start">
              <StyledEllipsisTypography variant="h5">
                {description}
              </StyledEllipsisTypography>
            </Tooltip>

            <FlexBox alignItems="baseline" gap="20px">
              <NameAndSourceContent
                gap="10px"
                alignItems="center"
                renderSeparator={() => <CircularSeparator />}
              >
                <Tooltip title={'Customer Name'}>
                  <Typography variant="body2">{customerName}</Typography>
                </Tooltip>
                <FlexBox gap={'5px'} alignItems="center">
                  <TicketInfoContent variant="subheading1">
                    via
                  </TicketInfoContent>
                  {getSourceIcon(createdFrom)}
                  <TicketInfoContent variant="body2">
                    {getParsedChatType(createdFrom)}
                  </TicketInfoContent>
                </FlexBox>
              </NameAndSourceContent>
              {responseDue ? (
                <ResponseDueIndicator responseDue={responseDue} />
              ) : (
                <></>
              )}
            </FlexBox>
          </FlexBox>

          <FlexBox
            gap={'20px'}
            renderSeparator={onRenderSeparator}
            alignItems="center"
          >
            <TicketInfoContent variant="body2" width={'80px'}>
              {'#' + ticketId}
            </TicketInfoContent>
            <CreatedAt createdAt={createdAt} />
            <ResolutionDue resolutionDue={resolutionDue} />
            <AgentAssigned assigneeInfo={assigneeInfo} />
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox alignItems="center">
        <Priority priority={priority} />
        {isFeatureAccessible('edit_status') ? (
          <TicketStatusContainer
            ticketStatus={ticketStatus}
            ticketId={ticketId}
            statusUpdateString={''}
            renderMode="card"
          />
        ) : null}
      </FlexBox>
    </StyledCard>
  );
};

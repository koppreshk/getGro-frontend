import { Checkbox, Chip, Tooltip } from '@mui/material';
import { Row, createColumnHelper } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from 'lib/hooks';
import { DataGrid, NoDataIllustration } from 'lib/ui-ux';
import { useDateDifference } from 'lib/utils';
import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ITicketDetails } from '../apis';
import { useSourceIcon } from '../hooks/ticket-hooks';
import { setTotalPages } from '../storage';

interface IDisplayTicketsGridProps {
  data: ITicketDetails[];
  isLoading?: boolean;
  totalPages: number;
}

export const ResDue = (props: { date: string }) => {
  const { date } = props;
  const { dateColor, parsedDateString } = useDateDifference(date);
  return (
    <>
      <Tooltip title={date}>
        {<Chip label={parsedDateString} color={dateColor} size="small" />}
      </Tooltip>
    </>
  );
};

const PriorityIcon = styled.div<{ $priority: string }>`
  ${({ $priority }) => {
    switch ($priority.toLocaleLowerCase()) {
      case 'low':
        return css`
          background-color: #eefff0;
          color: #68966d;
          border: 1px solid #eefff0;
        `;
      case 'normal':
        return css`
          background-color: #fcf3e7;
          color: #5a2d0b;
          border: 1px solid #fcf3e7;
        `;
      case 'high':
        return css`
          background-color: #ffeded;
          color: #c3514f;
          border: 1px solid #ffeded;
        `;
      case 'critical':
        return css`
          background-color: #ffecee;
          color: #bf363f;
          border: 1px solid #ffb7bd;
        `;
    }
  }};
  padding: 5px 9px;
  border-radius: 16px;
  text-transform: unset;
  height: unset;
  font-size: 14px;
  width: fit-content;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const PriorityDot = styled.div<{ $priority: string }>`
  ${({ $priority }) => {
    switch ($priority.toLocaleLowerCase()) {
      case 'low':
        return css`
          background-color: #29b773;
        `;
      case 'normal':
        return css`
          background-color: #f0a637;
        `;
      case 'high':
        return css`
          background-color: #eb6363;
        `;
      case 'critical':
        return css`
          background-color: #942b36;
        `;
    }
  }};
  width: 12px;
  height: 12px;
  border-radius: 100%;
  margin-right: 8px;
`;

export const Priority = (args: { priority: string; className?: string }) => {
  const { priority, className } = args;
  return (
    <PriorityIcon $priority={priority} className={className}>
      <PriorityDot $priority={priority} />
      {priority}
    </PriorityIcon>
  );
};

const useColumns = () => {
  const getSourceIcon = useSourceIcon();
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<ITicketDetails>();

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllPageRowsSelected(),
            indeterminate: table.getIsSomePageRowsSelected(),
            onChange: table.getToggleAllPageRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => {
        const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
          event.stopPropagation();
        };
        return (
          <Checkbox
            onClick={onClick}
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        );
      },
      maxSize: 58,
      enableResizing: false,
      enableHiding: false,
      meta: {
        disableColReorder: true,
      },
    }),
    columnHelper.accessor('ticketId', {
      header: t('ticket_id'),
      id: 'ticketId',
      cell: (info) => info.getValue(),
      minSize: 70,
    }),
    columnHelper.accessor('customerName', {
      header: t('customer_name'),
      id: 'customerName',
      cell: (info) => info.getValue(),
      minSize: 200,
    }),
    columnHelper.accessor('source', {
      id: 'source',
      header: t('source'),
      cell: (info) => getSourceIcon(info.getValue().toLocaleLowerCase()),
      minSize: 120,
    }),
    columnHelper.accessor('ticketStatus', {
      header: () => t('status'),
      id: 'ticketStatus',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('createdAt', {
      header: () => t('created_at'),
      id: 'createdAt',
      cell: (info) => info.getValue(),
      minSize: 180,
    }),
    columnHelper.accessor('priority', {
      header: t('priority'),
      id: 'priority',
      minSize: 140,
      cell: (info) => {
        return <Priority priority={info.getValue()} />;
      },
    }),
    columnHelper.accessor('resolutionDue', {
      header: () => t('resolution_due'),
      id: 'resolutionDue',
      cell: (info) => (
        <>
          {info.getValue() ? (
            <ResDue date={info.getValue()} />
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      minSize: 200,
    }),
  ];

  return columns;
};

export const DisplayTicketsGrid = (props: IDisplayTicketsGridProps) => {
  const { data } = props;
  const navigate = useNavigate();
  const columns = useColumns();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const noOfRecords = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const match = useMatch('/:tickets/:ticketType');

  const onRowClick = React.useCallback(
    (row: Row<ITicketDetails>) => {
      navigate(
        `${match?.pathname}/${row.original.ticketId}?noOfRecords=${noOfRecords}&pageNumber=${pageNumber}`,
        { replace: true }
      );
    },
    [match?.pathname, navigate, noOfRecords, pageNumber]
  );

  React.useEffect(() => {
    dispatch(setTotalPages(props.totalPages));
  }, [dispatch, props.totalPages]);

  const { totalPages } = useAppSelector((state) => state.tickets);
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {data.length > 0 || props.isLoading ? (
        <DataGrid
          {...props}
          columns={columns}
          onRowClick={onRowClick}
          totalPages={totalPages}
        />
      ) : (
        <NoDataIllustration message={t('no_tickets_display')} />
      )}
    </React.Fragment>
  );
};

import { FilterAlt, FilterAltOutlined } from '@mui/icons-material';
import { Badge, Popover } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { CustomIconButton } from 'lib/ui-ux/common';
import { DateTime } from 'luxon';
import { IQueueMetadata } from 'modules/settings/apis';
import { IChannels } from 'modules/settings/apis/tags';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { IPriorities, ITag } from 'modules/tickets/apis';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AdvanceSearchPopupContent } from './advance-search-popup-content';

export interface IAdvanceSearchProps {
  combinedData: {
    priorities: IPriorities[] | undefined;
    statuses: IGenericResponse[] | undefined;
    tags: ITag[] | undefined;
    agents: IQueueMetadata | undefined;
    channels: IChannels[] | undefined;
  };
}

interface IKeyValue {
  key: string;
  value: string;
}

export interface ISearchTickets {
  requesterEmail: string;
  priority: IKeyValue[];
  assignee: IKeyValue[];
  status: IKeyValue[];
  createdDate: DateTime | null;
  tags: IKeyValue[];
  source: IKeyValue[];
}

export const AdvanceSearch = (props: IAdvanceSearchProps) => {
  const { agents, channels, priorities, statuses, tags } = props.combinedData;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const isFilterApplied = useAppSelector(
    (state) => state.tickets.isAdvanceFiltersEnabled
  );

  const filters = useAppSelector((state) => state.tickets.filters);

  const defaultValues: ISearchTickets | undefined = useMemo(() => {
    if (Object.keys(filters).length) {
      return {
        requesterEmail: filters.requesterEmail || '',
        priority:
          priorities
            ?.filter((item) =>
              filters.priority?.split(',').includes(item.id.toString())
            )
            .map((item) => ({ key: item.id.toString(), value: item.name })) ||
          [],
        assignee:
          agents?.employees
            .filter((item) =>
              filters.assignee?.split(',').includes(item.id.toString())
            )
            .map((item) => ({
              key: item.id.toString(),
              value: item.firstName || '',
            })) || [],
        status:
          statuses
            ?.filter((item) =>
              filters.status?.split(',').includes(item.id.toString())
            )
            .map((item) => ({ key: item.id.toString(), value: item.name })) ||
          [],
        tags:
          tags
            ?.filter((item) =>
              filters.tags?.split(',').includes(item.id.toString())
            )
            .map((item) => ({ key: item.id.toString(), value: item.name })) ||
          [],
        source:
          channels
            ?.filter((item) =>
              filters.source?.split(',').includes(item.channel_id.toString())
            )
            .map((item) => ({
              key: item.channel_id.toString(),
              value: item.name,
            })) || [],
        createdDate: filters?.createdDate
          ? DateTime.fromFormat(filters.createdDate, 'yyyy-MM-dd HH:mm:ss')
          : null,
      };
    }
    return undefined;
  }, [agents?.employees, channels, filters, priorities, statuses, tags]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formMethods = useForm<ISearchTickets>({
    defaultValues: defaultValues ?? {
      requesterEmail: '',
      priority: [],
      assignee: [],
      status: [],
      tags: [],
      source: [],
      createdDate: null,
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Badge
        color="warning"
        variant="dot"
        invisible={!isFilterApplied}
        overlap="circular"
      >
        <CustomIconButton
          iconComponent={
            isFilterApplied ? (
              <FilterAlt fontSize="small" />
            ) : (
              <FilterAltOutlined fontSize="small" />
            )
          }
          tooltipProps={{
            title: isFilterApplied ? 'Filters Applied' : 'Show Filter',
          }}
          onClick={handleClick}
          color={isFilterApplied ? 'primary' : 'default'}
        />
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: '50%',
          },
        }}
      >
        <AdvanceSearchPopupContent {...props} handleClose={handleClose} />
      </Popover>
    </FormProvider>
  );
};

import {
  ArchiveOutlined,
  AssignmentIndOutlined,
  CheckBox,
  CheckBoxOutlineBlank,
  ChevronLeft,
  ChevronRight,
  DeleteOutline,
  DownloadForOfflineOutlined,
  FilterAlt,
  FilterAltOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  MarkChatReadOutlined,
  MarkUnreadChatAltOutlined,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Popover,
  TextField,
  Tooltip,
  Typography,
  debounce,
} from '@mui/material';
import i18n from 'i18n';
import { t } from 'i18next';
import {
  SelectFieldWithLabel,
  DateTimePickerFieldWithLabel,
  TextboxFieldWithLabel,
  AutoCompleteFieldWithLabel,
  AutoCompleteRenderOptionProps,
} from 'lib/form-fields';
import { useAppSelector } from 'lib/hooks';
import {
  CustomIconButton,
  FlexBox,
  GridLayout,
  RefreshButton,
  VerticalSeparator,
} from 'lib/ui-ux';
import { DateTime } from 'luxon';
import {
  IQueueMetadata,
  useFetchTicketMetadata,
} from 'modules/settings/apis/queues/fetch-queue-metadata';
import { useFetchAllTags } from 'modules/settings/apis/tags/fetch-all-tags';
import { useFetchAllStatuses } from 'modules/settings/apis/ticket-status/fetch_all_statuses';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { ITag } from 'modules/tickets/apis';
import {
  IPriorities,
  useFetchPriorities,
} from 'modules/tickets/apis/fetch-priorities';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMatch, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { ContentViewMode } from './content-view-mode';

const StyledFlexBox = styled(FlexBox)`
  padding: 0px 20px 0 20px;
`;

interface ITableControlProps {
  isTableActionsvisible?: boolean;
  enableSerchField?: boolean;
  isContentViewModeVisible?: boolean;
  totalPages?: number;
  onDownloadBtnClick?: () => void;
  searchPlaceholder?: string;
  searchLabel?: string;
  fetchAllTicketsWithSearchQuery?: (args?: Record<string, string>) => void;
}

const TableActions = () => {
  const tableActionOptions = [
    {
      title: 'Mark as read',
      renderIcon: () => <MarkChatReadOutlined fontSize="small" />,
      addSeperator: false,
    },
    {
      title: 'Mark as unread',
      renderIcon: () => <MarkUnreadChatAltOutlined fontSize="small" />,
      addSeperator: true,
    },
    {
      title: 'Assign',
      renderIcon: () => <AssignmentIndOutlined fontSize="small" />,
      addSeperator: false,
    },
    {
      title: 'Dispose',
      renderIcon: () => <ArchiveOutlined fontSize="small" />,
      addSeperator: true,
    },
    {
      title: 'Delete',
      renderIcon: () => <DeleteOutline fontSize="small" />,
      addSeperator: false,
    },
  ];

  return (
    <FlexBox alignItems="center" gap="10px">
      {tableActionOptions.map((option, index) => (
        <div key={index}>
          <Tooltip
            title={option.title}
            key={option.title}
            arrow
            placement="bottom"
          >
            <IconButton>{option.renderIcon()}</IconButton>
          </Tooltip>
          {option.addSeperator ? <VerticalSeparator /> : <></>}
        </div>
      ))}
    </FlexBox>
  );
};

type Rows = '10' | '20' | '30' | '40' | '50';
interface INoOfRowsProps {
  noOfRows: Rows;
  onFilterChangeHandler: (value: Rows) => void;
}

const StyledFilterContainer = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const Text = styled(Typography)<{ $isSelected?: boolean }>`
  && {
    color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.pallete.primaryPurple : '#3b4455'};
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.pallete.white : 'unset'};
    padding: 4px;
    border-radius: inherit;
    cursor: pointer;
  }
`;

const NoOfPages = (props: INoOfRowsProps) => {
  const { noOfRows, onFilterChangeHandler } = props;
  return (
    <>
      <StyledFilterContainer gap="4px">
        {['10', '20', '30', '40', '50'].map((item) => (
          <Tooltip key={item} title={`${item} ${t('rows_per_page')}`}>
            <Text
              variant="subheading1"
              $isSelected={noOfRows === item}
              onClick={() => onFilterChangeHandler(item as Rows)}
            >
              {item}
            </Text>
          </Tooltip>
        ))}
      </StyledFilterContainer>
    </>
  );
};

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
  source: string;
}

interface IAdvanceSearchProps {
  combinedData: {
    priorities: IPriorities[] | undefined;
    statuses: IGenericResponse[] | undefined;
    tags: ITag[] | undefined;
    agents: IQueueMetadata | undefined;
  };
  fetchAllTicketsWithSearchQuery?: (args?: Record<string, string>) => void;
}

const AdvanceSearch = (props: IAdvanceSearchProps) => {
  const {
    combinedData: { agents, priorities, statuses, tags },
    fetchAllTicketsWithSearchQuery,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const formMethods = useForm<ISearchTickets>({
    defaultValues: {
      requesterEmail: '',
      priority: [],
      assignee: [],
      status: [],
      tags: [],
      source: '',
      createdDate: null,
    },
  });

  const [isfilterApplied, setisfilterApplied] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (formData: ISearchTickets) => {
    const createdDate = formData.createdDate
      ? formData.createdDate.toFormat('yyyy-MM-dd HH:mm:ss')
      : '';
    const formObject: Record<string, string> = {
      createdDate: createdDate,
      priority: formData.priority.map((item) => Number(item.key)).join(','),
      assignee: formData.assignee.map((item) => Number(item.key)).join(','),
      status: formData.status.map((item) => Number(item.key)).join(','),
      tags: formData.tags.map((item) => Number(item.key)).join(','),
      source: formData.source ? formData.source : '',
      email: formData.requesterEmail ? formData.requesterEmail : '',
    };
    if (fetchAllTicketsWithSearchQuery) {
      const finalArgs = Object.keys(formObject).reduce(
        (acc, key) => {
          const typedKey = key as keyof typeof formObject;
          if (
            formObject[typedKey] !== undefined &&
            formObject[typedKey] !== ''
          ) {
            acc[typedKey] = formObject[typedKey];
          }
          return acc;
        },
        {} as Record<string, string>
      );
      fetchAllTicketsWithSearchQuery(finalArgs);
      setisfilterApplied(true);
      searchParams.set('advanceFilters', 'enabled');
      setSearchParams(searchParams);
      handleClose();
    }
  };

  const onClearFilter = () => {
    formMethods.reset();
    handleClose();
    if (fetchAllTicketsWithSearchQuery) {
      fetchAllTicketsWithSearchQuery({});
      setisfilterApplied(false);
      searchParams.delete('advanceFilters');
      setSearchParams(searchParams);
    }
  };

  const open = Boolean(anchorEl);

  const renderAgentOption: AutoCompleteRenderOptionProps = (
    optionprops,
    option,
    state
  ) => {
    return (
      <li {...optionprops}>
        <Checkbox
          icon={<CheckBoxOutlineBlank fontSize="small" />}
          checkedIcon={<CheckBox fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={state.selected}
        />
        <FlexBox flexDirection="column">
          <Typography variant="h6">{option.value.split(';')[0]}</Typography>
          <Typography variant="body3">{option.value.split(';')[1]}</Typography>
        </FlexBox>
      </li>
    );
  };

  return (
    <FormProvider {...formMethods}>
      <Badge
        color="warning"
        variant="dot"
        invisible={!isfilterApplied}
        overlap="circular"
      >
        <CustomIconButton
          iconComponent={
            isfilterApplied ? (
              <FilterAlt fontSize="small" />
            ) : (
              <FilterAltOutlined fontSize="small" />
            )
          }
          tooltipProps={{
            title: isfilterApplied ? 'Filters Applied' : 'Show Filter',
          }}
          onClick={handleClick}
          color={isfilterApplied ? 'primary' : 'default'}
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
        <Box p={2} height="100%">
          <Typography>Filters</Typography>
          <GridLayout
            $padding="10px 0"
            $gridGap="14px 12px"
            $gridTemplateColumns={'repeat(2, 1fr)'}
          >
            <AutoCompleteFieldWithLabel
              size="small"
              name="priority"
              placeholder="Priority"
              label={t('priority')}
              options={
                priorities?.map((priority) => ({
                  key: priority.id.toString(),
                  value: priority.name,
                })) || []
              }
            />
            <AutoCompleteFieldWithLabel
              size="small"
              name="assignee"
              placeholder="Assignee"
              label={t('assignee')}
              getOptionLabel={(option) => option.value.split(';')[0]}
              options={
                agents?.employees.map((agent) => ({
                  key: agent.id.toString(),
                  value: [
                    `${agent.firstName} ${agent.lastName ?? ''}`,
                    agent?.email,
                  ].join(';'),
                })) || []
              }
              renderOption={renderAgentOption}
            />
            <AutoCompleteFieldWithLabel
              size="small"
              name="status"
              placeholder="Status"
              label={t('status')}
              options={
                statuses?.map((status) => ({
                  key: status.id.toString(),
                  value: status.name,
                })) || []
              }
            />
            <AutoCompleteFieldWithLabel
              size="small"
              name="tags"
              placeholder="Tags"
              label={t('tags')}
              options={
                tags?.map((tag) => ({
                  key: tag.id.toString(),
                  value: tag.name,
                })) || []
              }
            />
            <DateTimePickerFieldWithLabel
              label="Crated date"
              name="createdDate"
              size="small"
              views={['year', 'day']}
            />
            <SelectFieldWithLabel
              sx={{ width: '100%' }}
              size="small"
              name="source"
              label={t('source')}
              menuOptions={[
                { key: '1', value: 'Low' },
                { key: '2', value: 'High' },
              ]}
              fullWidth
            />
            <TextboxFieldWithLabel
              name="requesterEmail"
              type="email"
              label={t('requester_email')}
              size="small"
              sx={{ width: '100%' }}
            />
          </GridLayout>
          <FlexBox
            justifyContent="space-between"
            gap={'15px'}
            padding="16px 0 0 0"
            style={{ borderTop: '1px solid #E9EBED' }}
          >
            <Button variant="outlined" onClick={handleClose} color="error">
              {t('close')}
            </Button>
            <FlexBox gap={'15px'}>
              <Button variant="text" onClick={onClearFilter}>
                Clear Filter
              </Button>
              <Button
                variant="contained"
                onClick={formMethods.handleSubmit(handleSubmit)}
              >
                {t('apply')}
              </Button>
            </FlexBox>
          </FlexBox>
        </Box>
      </Popover>
    </FormProvider>
  );
};

interface IAdvanceSearchContainerProps {
  fetchAllTicketsWithSearchQuery?: (args?: Record<string, string>) => void;
}

const AdvanceSearchContainer = (props: IAdvanceSearchContainerProps) => {
  const {
    data: prioritiesData,
    isLoading: isPrioritiesLoading,
    error: prioritiesError,
  } = useFetchPriorities();

  const {
    data: statusesData,
    isLoading: isStatusesLoading,
    error: statusesError,
  } = useFetchAllStatuses();

  const {
    data: tagsData,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useFetchAllTags();

  const {
    data: agentsData,
    isLoading: isAgentsdataLoading,
    error: agentsDataError,
  } = useFetchTicketMetadata();

  const isLoading =
    isPrioritiesLoading ||
    isStatusesLoading ||
    isTagsLoading ||
    isAgentsdataLoading;

  const errors = {
    prioritiesError,
    statusesError,
    tagsError,
    agentsDataError,
  };

  const combinedData = {
    priorities: prioritiesData,
    statuses: statusesData,
    tags: tagsData,
    agents: agentsData,
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (Object.values(errors).some((error) => error)) {
    return <div>Error loading data</div>;
  }

  return (
    <AdvanceSearch
      combinedData={combinedData}
      fetchAllTicketsWithSearchQuery={props.fetchAllTicketsWithSearchQuery}
    />
  );
};

export const TableControls = (props: ITableControlProps) => {
  const {
    isTableActionsvisible,
    totalPages,
    enableSerchField,
    onDownloadBtnClick,
    isContentViewModeVisible,
    searchLabel = i18n.t('search_tickets'),
    searchPlaceholder = i18n.t('search_by_ticket_id_subject'),
    fetchAllTicketsWithSearchQuery,
  } = props;
  const config = useAppSelector((state) => state.core.config);
  const [searchParams, setSearchParams] = useSearchParams();
  const viewFilter = useMatch('tickets/all_tickets');
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const noOfRecords = searchParams.get('noOfRecords')
    ? searchParams.get('noOfRecords')!
    : (config?.ticket_page_count.toString() ??
      searchParams.get('noOfRecords') ??
      '10');
  const cardView = searchParams.get('cardView')
    ? searchParams.get('cardView')!
    : config?.ticket_layout_view
      ? config?.ticket_layout_view === 'card_view'
      : 'true';
  const searchTextFromParams = searchParams.get('searchText');
  const [noOfRows, setFilters] = useState(noOfRecords);

  React.useEffect(() => {
    searchParams.set('noOfRecords', noOfRecords);
    searchParams.set('pageNumber', pageNumber.toString());
    searchParams.set('cardView', cardView.toString());
    if (searchTextFromParams) {
      searchParams.set('searchText', searchTextFromParams);
    }
    setSearchParams(searchParams);
  }, [
    cardView,
    noOfRecords,
    pageNumber,
    searchParams,
    searchTextFromParams,
    setSearchParams,
  ]);

  const onFilterChangeHandler = useCallback(
    (value: Rows) => {
      setFilters(value);
      searchParams.set('noOfRecords', value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const firstBtnClick = useCallback(() => {
    searchParams.set('pageNumber', '1');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const lastBtnClick = useCallback(() => {
    searchParams.set('pageNumber', totalPages!.toString());
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, totalPages]);

  const onNextPage = useCallback(() => {
    searchParams.set('pageNumber', (pageNumber + 1).toString());
    setSearchParams(searchParams);
  }, [pageNumber, searchParams, setSearchParams]);

  const onPrevPage = useCallback(() => {
    searchParams.set('pageNumber', (pageNumber - 1).toString());
    setSearchParams(searchParams);
  }, [pageNumber, searchParams, setSearchParams]);

  const onSearchChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (ev) => {
      if (ev.target.value.length) {
        searchParams.set('searchText', ev.target.value);
        setSearchParams(searchParams);
        return;
      }
      searchParams.delete('searchText');
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const debouncedSearchChange = debounce(onSearchChange, 200);

  const onGridModeChange = (selectedValue: string) => {
    searchParams.set('cardView', selectedValue === 'card' ? 'true' : 'false');
    setSearchParams(searchParams);
  };

  return (
    <StyledFlexBox justifyContent="space-between" height="76px">
      <FlexBox alignItems="center">
        {isTableActionsvisible ? <TableActions /> : null}
        {enableSerchField ? (
          <TextField
            placeholder={searchPlaceholder}
            defaultValue={searchTextFromParams}
            sx={{ width: '300px' }}
            size="small"
            type="search"
            label={searchLabel}
            onChange={debouncedSearchChange}
          />
        ) : null}
      </FlexBox>
      <FlexBox gap="30px" alignItems="center">
        {isContentViewModeVisible ? (
          <ContentViewMode
            onGridModeChange={onGridModeChange}
            selectedValue={cardView === 'true' ? 'card' : 'grid'}
          />
        ) : null}
        <VerticalSeparator />
        <NoOfPages
          noOfRows={noOfRows as Rows}
          onFilterChangeHandler={onFilterChangeHandler}
        />
        {viewFilter && (
          <>
            <VerticalSeparator />
            <AdvanceSearchContainer
              fetchAllTicketsWithSearchQuery={fetchAllTicketsWithSearchQuery}
            />
          </>
        )}
        <VerticalSeparator />
        <FlexBox>
          <IconButton
            aria-label="First"
            onClick={firstBtnClick}
            disabled={pageNumber === 1}
            color="primary"
          >
            <KeyboardDoubleArrowLeft fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Previous"
            onClick={onPrevPage}
            disabled={pageNumber === 1}
            color="primary"
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
          <FlexBox gap="5px" alignItems="center">
            <Typography variant="body3">
              {pageNumber} of {totalPages}
            </Typography>
          </FlexBox>
          <IconButton
            aria-label="Next"
            onClick={onNextPage}
            disabled={pageNumber === totalPages}
            color="primary"
          >
            <ChevronRight fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Last"
            onClick={lastBtnClick}
            disabled={pageNumber === totalPages}
            color="primary"
          >
            <KeyboardDoubleArrowRight fontSize="small" />
          </IconButton>
        </FlexBox>
        <VerticalSeparator />
        {onDownloadBtnClick ? (
          <>
            <CustomIconButton
              iconComponent={<DownloadForOfflineOutlined fontSize="small" />}
              tooltipProps={{ title: t('download_as_csv') }}
              onClick={onDownloadBtnClick}
            />
            <VerticalSeparator />
          </>
        ) : null}
        <RefreshButton />
      </FlexBox>
    </StyledFlexBox>
  );
};

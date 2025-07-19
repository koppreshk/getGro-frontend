import {
  ArchiveOutlined,
  AssignmentIndOutlined,
  ChevronLeft,
  ChevronRight,
  DeleteOutline,
  DownloadForOfflineOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  MarkChatReadOutlined,
  MarkUnreadChatAltOutlined,
} from '@mui/icons-material';
import {
  IconButton,
  TextField,
  Tooltip,
  Typography,
  debounce,
} from '@mui/material';
import i18n from 'i18n';
import { t } from 'i18next';
import { useAppSelector } from 'lib/hooks';
import {
  CustomIconButton,
  FlexBox,
  RefreshButton,
  VerticalSeparator,
} from 'lib/ui-ux';
import { AdvanceSearchContainer } from 'modules/tickets/containers';
import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

export const NoOfPages = (props: INoOfRowsProps) => {
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

export const TableControls = (props: ITableControlProps) => {
  const {
    isTableActionsvisible,
    totalPages,
    enableSerchField,
    onDownloadBtnClick,
    isContentViewModeVisible,
    searchLabel = i18n.t('search_tickets'),
    searchPlaceholder = i18n.t('search_by_ticket_id_subject'),
  } = props;
  const config = useAppSelector((state) => state.core.config);
  const [searchParams, setSearchParams] = useSearchParams();
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
        {
          <>
            <VerticalSeparator />
            <AdvanceSearchContainer />
          </>
        }
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

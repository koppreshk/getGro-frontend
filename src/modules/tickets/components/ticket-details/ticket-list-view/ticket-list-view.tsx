import {
  KeyboardDoubleArrowLeft,
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { TicketListViewLoader } from 'lib/ui-ux/loader-components';
import { ITicketDetails } from 'modules/tickets/apis';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { TicketList, TicketListViewHeader } from '.';

const TickListWrapper = styled(FlexBox)`
  overflow: auto;
`;

interface ITicketListViewsProps {
  data?: ITicketDetails[];
  isLoading?: boolean;
  totalPages: number | undefined;
}

const Pagination = (props: Pick<ITicketListViewsProps, 'totalPages'>) => {
  const { totalPages = 0 } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('pageNumber')) || 1;

  const onNextPage = () => {
    const newPage = currentPage + 1;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('pageNumber', newPage.toString());
    setSearchParams(newParams);
  };

  const onPrevPage = () => {
    const newPage = currentPage > 1 ? currentPage - 1 : 1;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('pageNumber', newPage.toString());
    setSearchParams(newParams);
  };

  const navigateToFirstPage = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('pageNumber', '1');
    setSearchParams(newParams);
  };

  const navigateToLastPage = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('pageNumber', totalPages.toString());
    setSearchParams(newParams);
  };

  return (
    <FlexBox>
      <IconButton
        aria-label="First"
        onClick={navigateToFirstPage}
        disabled={currentPage === 1}
        color="primary"
      >
        <KeyboardDoubleArrowLeft fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="Previous"
        onClick={onPrevPage}
        disabled={currentPage === 1}
        color="primary"
      >
        <ChevronLeft fontSize="small" />
      </IconButton>
      <FlexBox gap="5px" alignItems="center">
        <Typography variant="body3">
          {currentPage} of {totalPages}
        </Typography>
      </FlexBox>
      <IconButton
        aria-label="Next"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        color="primary"
      >
        <ChevronRight fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="Last"
        onClick={navigateToLastPage}
        disabled={currentPage === totalPages}
        color="primary"
      >
        <KeyboardDoubleArrowRight fontSize="small" />
      </IconButton>
    </FlexBox>
  );
};

const ItemsPerPageDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent<number>) => {
    const itemsPerPage = Number(event.target.value);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('noOfRecords', itemsPerPage.toString());
    setSearchParams(newParams);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 85, maxHeight: 35 }}>
      <InputLabel id="items-per-page-label">List Items</InputLabel>
      <Select
        labelId="items-per-page-label"
        value={Number(searchParams.get('noOfRecords')) || 10}
        label="Items per page"
        onChange={handleChange}
        sx={{ maxHeight: '35px !important' }}
      >
        {[10, 20, 30, 40, 50].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const TicketListView = (props: ITicketListViewsProps) => {
  const { data, isLoading, totalPages } = props;

  return (
    <FlexBox
      flexDirection="column"
      width="100%"
      style={{ backgroundColor: '#fff' }}
    >
      <TicketListViewHeader />
      <TickListWrapper
        flexDirection="column"
        width="100%"
        height="calc(100% - 119px)"
      >
        {isLoading ? (
          <TicketListViewLoader />
        ) : (
          <TicketList data={data || []} />
        )}
      </TickListWrapper>
      <FlexBox
        padding="8px 8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Pagination totalPages={totalPages} />
        <ItemsPerPageDropdown />
      </FlexBox>
    </FlexBox>
  );
};

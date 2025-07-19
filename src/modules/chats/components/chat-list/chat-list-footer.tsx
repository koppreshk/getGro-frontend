import {
  KeyboardDoubleArrowLeft,
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import {
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const PageSizeDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get('noOfRecords') || '10';
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const currentValue = searchParams.get('noOfRecords') || '10';
    if (currentValue !== value) {
      setValue(currentValue);
    }
  }, [searchParams, value]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setValue(newValue);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('noOfRecords', newValue);
    newParams.set('pageNumber', '1'); // reset to page 1 on page size change
    setSearchParams(newParams);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
      <InputLabel id="page-size-label">List Size</InputLabel>
      <Select
        labelId="page-size-label"
        id="page-size-select"
        value={value}
        label="Page Size"
        onChange={handleChange}
      >
        {[10, 20, 30, 40, 50].map((num) => (
          <MenuItem key={num} value={num.toString()}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const ChatListFooter = (props: {
  totalPages: number;
  pageNumber: number;
}) => {
  const { totalPages } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const noOfRecords = searchParams.get('noOfRecords') || '10';

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('noOfRecords', noOfRecords.toString());
    newParams.set('pageNumber', pageNumber.toString());
    setSearchParams(newParams);
  }, [noOfRecords, pageNumber, searchParams, setSearchParams]);

  const updatePageNumber = useCallback(
    (newPage: number) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('pageNumber', newPage.toString());
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === totalPages;

  return (
    <FlexBox justifyContent="space-between" alignItems="center" padding="10px">
      {/* Pagination Controls */}
      <FlexBox alignItems="center">
        <IconButton
          aria-label="First"
          onClick={() => updatePageNumber(1)}
          disabled={isFirstPage}
          color="primary"
        >
          <KeyboardDoubleArrowLeft fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="Previous"
          onClick={() => updatePageNumber(pageNumber - 1)}
          disabled={isFirstPage}
          color="primary"
        >
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography variant="body2">
          {pageNumber} of {totalPages}
        </Typography>
        <IconButton
          aria-label="Next"
          onClick={() => updatePageNumber(pageNumber + 1)}
          disabled={isLastPage}
          color="primary"
        >
          <ChevronRight fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="Last"
          onClick={() => updatePageNumber(totalPages)}
          disabled={isLastPage}
          color="primary"
        >
          <KeyboardDoubleArrowRight fontSize="small" />
        </IconButton>
      </FlexBox>

      {/* Page Size Selector */}
      <PageSizeDropdown />
    </FlexBox>
  );
};

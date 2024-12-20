import { ErrorMessage } from '@hookform/error-message';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import { StyledErrorMessage } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

import { IPrimaryTicketDetailsProps } from './primary-ticket-details';
import { TicketInfo } from './ticket-info';

export const SearchTickets = (
  props: Pick<IPrimaryTicketDetailsProps, 'data' | 'isLoading' | 'onChange'>
) => {
  const { data, isLoading, onChange } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const hasError = get(errors, 'searchTickets') !== undefined;

  const validateField = (val: []) => {
    if (val.length <= 0) {
      return 'Please make at least 1 selection to merge tickets';
    }
  };

  const debouncedChange = debounce(onChange, 500);

  return (
    <FlexBox flexDirection="column" gap={'5px'}>
      <Controller
        render={({ field: { onChange: formOnChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            id="grouped-demo"
            isOptionEqualToValue={(option, value) =>
              option.ticketId === value.ticketId
            }
            options={data?.data || []}
            multiple
            sx={{ width: '100%' }}
            filterOptions={(x) => x}
            disableCloseOnSelect
            onChange={(_ev, newValue) => formOnChange(newValue)}
            getOptionLabel={(option) => option.description}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Search a secondary ticket by ID or Subject"
                size="small"
                autoFocus
                error={hasError}
                required={true}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                onChange={debouncedChange}
              />
            )}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props} key={option.ticketId}>
                  <TicketInfo
                    multiSelect
                    checked={selected}
                    ticketDetails={{
                      customerName: option.customerName,
                      description: option.description,
                      ticketStatus: option.ticketStatus,
                      ticketId: option.ticketId,
                    }}
                  />
                </li>
              );
            }}
          />
        )}
        control={control}
        name={'searchTickets'}
        rules={{ validate: validateField }}
      />
      <ErrorMessage
        errors={errors}
        name={'searchTickets'}
        as={StyledErrorMessage}
      />
      <Typography variant="body3">
        Search and add secondary tickets that you want to merge with primary
        tickets
      </Typography>
    </FlexBox>
  );
};

import { ErrorMessage } from '@hookform/error-message';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import { t } from 'i18next';
import { StyledErrorMessage } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { Trans } from 'react-i18next';

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
      return t('merge_ticket_validation');
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
                placeholder={t('search_secondary_placeholder')}
                size="small"
                type="search"
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
            renderOption={(optionProps, option, { selected }) => {
              return (
                <li {...optionProps} key={option.ticketId}>
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
        <Trans i18nKey={'search_and_add'} />
      </Typography>
    </FlexBox>
  );
};

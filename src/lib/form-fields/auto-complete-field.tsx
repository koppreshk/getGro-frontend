/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import {
  ChipTypeMap,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete, {
  AutocompleteOwnerState,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import { FlexBox } from 'lib/ui-ux';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type AutoCompleteRenderOptionProps = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: any,
  state: AutocompleteRenderOptionState,
  ownerState: AutocompleteOwnerState<
    any,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined,
    ChipTypeMap['defaultComponent']
  >
) => React.ReactNode;

interface IAutocompleteFieldProps {
  name: string;
  label?: string;
  placeholder: string;
  size?: 'small' | 'medium';
  getOptionLabel?: (option: any) => string;
  renderOption?: AutoCompleteRenderOptionProps;
  options?: {
    key: string;
    value: string;
  }[];
  multiple?: boolean;
  isLoading?: boolean;
  sx?: any;
}

export const AutocompleteField = (props: IAutocompleteFieldProps) => {
  const {
    name,
    options = [],
    label,
    placeholder,
    size = 'medium',
    getOptionLabel,
    renderOption,
    multiple = true,
    isLoading = false,
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange, ref, value, ...rest } }) => (
        <Autocomplete
          {...rest}
          multiple={multiple}
          options={options}
          disableCloseOnSelect={multiple} // Only disable close when multiple is true
          limitTags={multiple ? 3 : undefined}
          size={size}
          value={
            multiple
              ? (value ?? []) // Ensure value is an array for multiple selection
              : (value ?? null) // Ensure value is a single object for single selection
          }
          isOptionEqualToValue={(option, val) => option.key === val?.key}
          getOptionLabel={(option) =>
            option?.value ?? getOptionLabel?.(option) ?? ''
          }
          onChange={(_ev, newValue) => {
            onChange(multiple ? newValue : (newValue ?? null)); // Ensure correct type
          }}
          renderOption={(renderProps, option, state, ownerState) => {
            if (renderOption) {
              return renderOption(
                renderProps,
                option,
                state,
                ownerState as any
              );
            }
            return (
              <li {...renderProps}>
                {multiple && (
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={state.selected}
                  />
                )}
                {option.value}
              </li>
            );
          }}
          style={{ width: '100%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              name={name}
              fullWidth
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
            />
          )}
        />
      )}
      control={control}
      name={name}
    />
  );
};

export const AutoCompleteFieldWithLabel = (props: IAutocompleteFieldProps) => {
  const { label, ...rest } = props;

  return (
    <FlexBox flexDirection={'column'} gap={'5px'}>
      <Typography variant="h6" className="select-field-header-label">
        {label}
      </Typography>
      <AutocompleteField {...rest} />
    </FlexBox>
  );
};

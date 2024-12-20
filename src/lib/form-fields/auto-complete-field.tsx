/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { ChipTypeMap, TextField } from '@mui/material';
import Autocomplete, {
  AutocompleteOwnerState,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';
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
  label: string;
  placeholder: string;
  size?: 'small' | 'medium';
  getOptionLabel?: (option: any) => string;
  renderOption?: AutoCompleteRenderOptionProps;
  options?: {
    key: string;
    value: string;
  }[];
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
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { onChange, ref, ...rest } }) => (
        <Autocomplete
          {...rest}
          multiple
          isOptionEqualToValue={(option, value) => option.key === value.key}
          id="checkboxes-tags-demo"
          options={options}
          disableCloseOnSelect
          limitTags={3}
          size={size}
          getOptionLabel={(option) =>
            getOptionLabel ? getOptionLabel(option) : option.value
          }
          onChange={(_ev, newValue) => onChange(newValue)}
          renderOption={(props, option, state, ownerState) => {
            if (renderOption) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return renderOption(props, option, state, ownerState as any);
            }
            return (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlank fontSize="small" />}
                  checkedIcon={<CheckBox fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={state.selected}
                />
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
            />
          )}
        />
      )}
      control={control}
      name={name}
    />
  );
};

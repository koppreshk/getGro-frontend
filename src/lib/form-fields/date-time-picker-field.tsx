import { Typography } from '@mui/material';
import {
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon/AdapterLuxon';
import { FlexBox, IFlexBoxProps } from 'lib/ui-ux';
// import { DateTime } from "luxon";
import { Controller, useFormContext } from 'react-hook-form';

type DateTimePickerFieldProps<TDate> = {
  name: string;
  label?: string;
  size?: 'small' | 'medium';
} & Omit<DateTimePickerProps<TDate>, 'size'>;

export const DateTimePickerField = <TDate,>(
  props: DateTimePickerFieldProps<TDate>
) => {
  const { label, name, size = 'medium', ...pickerProps } = props;
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <DateTimePicker
            {...rest}
            {...pickerProps}
            label={label}
            value={value}
            onChange={onChange}
            sx={{ width: '100%' }}
            slotProps={{
              textField: { size },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export const DateTimePickerFieldWithLabel = <TDate,>(
  props: DateTimePickerFieldProps<TDate> & IFlexBoxProps
) => {
  const { flexDirection = 'column', gap = '5px', label, ...rest } = props;

  return (
    <FlexBox
      flexDirection={flexDirection}
      gap={gap}
      alignItems={flexDirection === 'row' ? 'center' : 'unset'}
    >
      <Typography variant="h6" className="select-field-header-label">
        {label}
      </Typography>
      <DateTimePickerField<TDate> {...rest} />
    </FlexBox>
  );
};

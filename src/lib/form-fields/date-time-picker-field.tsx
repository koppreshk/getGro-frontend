import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon/AdapterLuxon";
// import { DateTime } from "luxon";
import { Controller, useFormContext } from "react-hook-form";

interface IDateTimePickerFieldProps {
    name: string;
    label: string;
}

export const DateTimePickerField = (props: IDateTimePickerFieldProps) => {
    const { label, name } = props;
    const { control } = useFormContext();

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                    <DateTimePicker
                        {...rest}
                        label={label}
                        value={value}
                        onChange={onChange}
                        
                        sx={{ width: '100%' }}
                    />
                )} />
        </LocalizationProvider>
    );
};
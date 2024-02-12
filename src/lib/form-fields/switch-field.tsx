import { FormControlLabel, FormControlLabelProps, Switch, SwitchProps } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"

type ISwitchFieldProps = Omit<SwitchProps, 'error' | 'required'> & Omit<FormControlLabelProps, 'control'> & {
    name: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

export const SwitchField = (props: ISwitchFieldProps) => {
    const { name, rules, label, ...rest } = props;
    const { control } = useFormContext();

    return (
        <>
            <Controller
                render={({ field }) => <FormControlLabel control={<Switch {...rest} {...field} />} label={label} />}
                control={control}
                name={name}
                rules={rules}
            />
        </>
    )
} 
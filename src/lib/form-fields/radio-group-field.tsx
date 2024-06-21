import { FormControl, FormControlLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"


type IRadioGroupFieldProps = Omit<RadioGroupProps, 'error' | 'required'> & {
    name: string;
    radioOptions: {
        label: string;
        key: string;
    }[];
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

export const RadioGroupField = (props: IRadioGroupFieldProps) => {
    const { name, rules, radioOptions, ...rest } = props;
    const { control } = useFormContext();

    return (
        <>
            <Controller
                render={({ field }) => (
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            {...rest} {...field}>
                            {radioOptions.map((item) => <FormControlLabel key={item.key} value={item.key} control={<Radio size="small"/>} label={item.label} />)}
                        </RadioGroup>
                    </FormControl>
                )}
                control={control}
                name={name}
                rules={rules}
            />
        </>
    )
}
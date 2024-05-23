import { FormControl, FormControlLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"


type ITextboxFieldCheckboxProps = Omit<RadioGroupProps, 'error' | 'required'> & {
    name: string;
    radioOptions: {
        label: string;
        key: string;
    }[];
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

export const RadioGroupField = (props: ITextboxFieldCheckboxProps) => {
    const { name, rules, radioOptions } = props;
    const { control } = useFormContext();

    return (
        <>
            <Controller
                render={({ field }) => (
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            {...props} {...field}>
                            {radioOptions.map((item) => <FormControlLabel value={item.key} control={<Radio />} label={item.label} />)}
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
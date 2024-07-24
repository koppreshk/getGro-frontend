import { FormControl, FormControlLabel, Radio, RadioGroup, RadioGroupProps, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"


type IRadioGroupFieldProps = Omit<RadioGroupProps, 'error' | 'required'> & {
    name: string;
    radioOptions: {
        label: string;
        subText?: string;
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
                            {radioOptions.map((item) => (
                                <FlexBox key={item.key} flexDirection="column">
                                    <FormControlLabel value={item.key} control={<Radio size="small" />} label={item.label} />
                                    {item.subText ? <Typography variant="body3" sx={{ pl: '27px' }}>{item.subText}</Typography> : null}
                                </FlexBox>
                            )
                            )}
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
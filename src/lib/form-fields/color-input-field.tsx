import { MuiColorInputProps, MuiColorInput } from "mui-color-input";
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"

type ITextboxFieldColorInputProps = Omit<MuiColorInputProps, 'value'> & {
    name: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

export const ColorInputField = (props: ITextboxFieldColorInputProps) => {
    const { name, rules, ...restProps } = props;
    const { control } = useFormContext();

    return (
        <>
            <Controller
                render={({ field: { value, ...restFields } }) => <MuiColorInput   {...restProps} {...restFields} value={value} />}
                control={control}
                name={name}
                rules={rules}
            />
        </>
    )
} 
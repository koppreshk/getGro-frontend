import { TextField, TextFieldProps } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

type ITextboxFieldProps = TextFieldProps & {
    name: string;
}

export const TextboxField = (props: ITextboxFieldProps) => {
    const { name } = props;
    const { control } = useFormContext();

    return (
        <Controller
            render={({ field }) => <TextField {...props} {...field} />}
            control={control}
            name={name}
        />
    )
} 
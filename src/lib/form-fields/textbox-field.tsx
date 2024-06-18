import { TextField, TextFieldProps } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import styled from "styled-components";
import { ErrorMessage } from '@hookform/error-message';

type ITextboxFieldProps = Omit<TextFieldProps, 'error' | 'required'> & {
    name: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

const StyledErrorMessage = styled.div`
  &&{
    color: #d32f2f;
    font-size: 13px;
  }  
`;

export const TextboxField = (props: ITextboxFieldProps) => {
    const { name, rules } = props;
    const { formState: { errors }, control } = useFormContext();
    const hasError = name in errors;

    return (
        <>
            <Controller
                render={({ field }) => <TextField {...props} {...field} error={hasError} required={typeof rules?.required == 'string' ? rules?.required?.length > 0 : false} />}
                control={control}
                name={name}
                rules={rules}
            />
            <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
        </>
    )
} 
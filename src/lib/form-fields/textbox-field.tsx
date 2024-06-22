import { TextField, TextFieldProps } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, get, useFormContext } from "react-hook-form"
import styled from "styled-components";
import { ErrorMessage } from '@hookform/error-message';
import { FlexBox } from "lib/ui-ux";

type ITextboxFieldProps = Omit<TextFieldProps, 'error' | 'required'> & {
    name: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

const StyledErrorMessage = styled.div`
  &&{
    color: #d32f2f;
    font-size: 13px;
  }  
`;

export const TextboxField = (props: ITextboxFieldProps) => {
    const { name, rules, ...rest } = props;
    const { formState: { errors }, control } = useFormContext();
    const hasError = get(errors, name) !== undefined;

    return (
        <FlexBox flexDirection="column">
            <Controller
                render={({ field }) => <TextField
                    {...rest} {...field}
                    error={hasError}
                    inputProps={{
                        min: rules?.min?.toString(),
                        max: rules?.max?.toString(),
                    }}
                    required={typeof rules?.required == 'string' ? rules?.required?.length > 0 : false} />}
                control={control}
                name={name}
                rules={rules}
            />
            <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
        </FlexBox>
    )
} 
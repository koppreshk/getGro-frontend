import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, get, useFormContext } from "react-hook-form"
import styled from "styled-components";
import { ErrorMessage } from '@hookform/error-message';
import { FlexBox, IFlexBoxProps } from "lib/ui-ux";

type ITextboxFieldProps = Omit<TextFieldProps, 'error' | 'required'> & {
    name: string;
    width?: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    readOnly?: boolean;
}

const StyledErrorMessage = styled.div`
  &&{
    color: #d32f2f;
    font-size: 13px;
  }  
`;

export const TextboxField = (props: ITextboxFieldProps) => {
    const { name, rules, readOnly, ...rest } = props;
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
                        readOnly: readOnly
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

export const TextboxFieldWithLabel = (props: ITextboxFieldProps & IFlexBoxProps) => {
    const { flexDirection = 'column', gap = '5px', label, ...rest } = props;
    return (
        <FlexBox flexDirection={flexDirection} gap={gap}>
            <Typography variant="h6">{label}</Typography>
            <TextboxField {...rest} />
        </FlexBox>
    )
}

export const PasswordField = (props: ITextboxFieldProps) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextboxField
            {...props}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}
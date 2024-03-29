import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import styled from "styled-components";
import { ErrorMessage } from '@hookform/error-message';

type ITextboxFieldProps = Omit<SelectProps<unknown>, 'error' | 'required'> & {
    name: string;
    menuOptions: {
        key: string;
        value: string;
        iconComponent?: React.ReactNode;
    }[]
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

const StyledErrorMessage = styled.div`
  &&{
    color: #d32f2f;
    font-size: 13px;
  }  
`;

export const SelectField = (props: ITextboxFieldProps) => {
    const { name, rules, label, menuOptions, sx, ...rest } = props;
    const { formState: { errors }, control } = useFormContext();
    const hasError = name in errors;

    return (
        <>
            <Controller
                render={({ field }) => (
                    <FormControl sx={sx}>
                        <InputLabel id="demo-select-small-label">{label}</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label={label}
                            {...rest} {...field} error={hasError} onChange={(e) => field.onChange(e.target.value)}>
                            {
                                menuOptions.map((item) => (
                                    <MenuItem key={item.key} value={item.key}>
                                        {item.iconComponent ?? null}
                                        {item.value}
                                    </MenuItem>))
                            }
                        </Select>
                    </FormControl>)}
                control={control}
                name={name}
                rules={rules}
            />
            <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
        </>
    )
} 
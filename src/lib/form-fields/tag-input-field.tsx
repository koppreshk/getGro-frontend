import { ErrorMessage } from "@hookform/error-message";
import { ITagInputProps, TagInput } from "lib/ui-ux";
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { StyledErrorMessage } from "./select-field";

interface ITagInputFieldProps extends ITagInputProps {
    name: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export const TagInputField = (props: ITagInputFieldProps) => {
    const { name, rules, ...restProps } = props;
    const { formState: { errors }, control } = useFormContext();

    return (
        <>
            <Controller
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { onChange, value, ref, ...rest } }) => (
                    <TagInput
                        {...restProps}
                        {...rest}
                        tagInputs={value}
                        onTagInputChange={onChange}
                    />
                )}
                control={control}
                name={name}
                rules={rules}
            />
            <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
        </>
    );
}
import { ITagInputProps, TagInput } from "lib/ui-ux";
import { Controller, useFormContext } from "react-hook-form";

interface ITagInputFieldProps extends ITagInputProps {
    name: string;
}

export const TagInputField = (props: ITagInputFieldProps) => {
    const { name } = props;
    const { control } = useFormContext();

    return (
        <>
            <Controller
                render={({ field: { onChange, value, ...rest } }) => (
                    <TagInput
                        {...props}
                        {...rest}
                        tagInputs={value}
                        onTagInputChange={onChange}
                    />
                )}
                control={control}
                name={name}
            />
        </>
    );
}
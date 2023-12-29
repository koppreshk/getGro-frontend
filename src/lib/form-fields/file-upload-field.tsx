import { FileUpload, IFileUploadProps } from "lib/ui-ux";
import { Controller, useFormContext } from "react-hook-form"

type IFileUploadFieldProps = Omit<IFileUploadProps, 'onChange'> & {
    name: string;
}

export const FileUploadField = (props: IFileUploadFieldProps) => {
    const { name } = props;
    const { control } = useFormContext();

    return (
        <Controller
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { onChange, value, ref, ...rest } }) => <FileUpload {...props} {...rest} onChange={onChange} initialSelectedFiles={value?.selectedFiles || []} />}
            control={control}
            name={name}
        />
    )
}
import { FileUpload, IChangeArgs, IFileUploadProps } from 'lib/ui-ux';
import { Controller, useFormContext } from 'react-hook-form';

type IFileUploadFieldProps = Omit<IFileUploadProps, 'onChange'> & {
  name: string;
  onFileUpload?: () => void;
};

export const FileUploadField = (props: IFileUploadFieldProps) => {
  const { name, onFileUpload } = props;
  const { control } = useFormContext();

  const _onChange = (
    args: IChangeArgs,
    onChange: (...event: any[]) => void
  ) => {
    if (onFileUpload) {
      onFileUpload();
    }
    onChange(args);
  };
  return (
    <Controller
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { onChange, value, ref, ...rest } }) => (
        <FileUpload
          {...props}
          {...rest}
          onChange={(args) => _onChange(args, onChange)}
          initialSelectedFiles={value?.selectedFiles || []}
        />
      )}
      control={control}
      name={name}
    />
  );
};

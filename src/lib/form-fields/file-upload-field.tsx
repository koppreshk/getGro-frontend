import { ErrorMessage } from '@hookform/error-message';
import { FileUpload, IChangeArgs, IFileUploadProps } from 'lib/ui-ux';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { StyledErrorMessage } from './select-field';

type IFileUploadFieldProps = Omit<IFileUploadProps, 'onChange'> & {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  onFileUpload?: () => void;
};

export const FileUploadField = (props: IFileUploadFieldProps) => {
  const { name, onFileUpload, rules } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // eslint-disable-next-line @typescript-eslint/naming-convention
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
    <>
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
        rules={rules}
      />
      <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
    </>
  );
};

import { Checkbox, CheckboxProps } from '@mui/material';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

type ITextboxFieldCheckboxProps = Omit<CheckboxProps, 'error' | 'required'> & {
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
};

export const CheckboxField = (props: ITextboxFieldCheckboxProps) => {
  const { name, rules } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        render={({ field: { value, ...restFields } }) => (
          <Checkbox {...props} {...restFields} checked={value} />
        )}
        control={control}
        name={name}
        rules={rules}
      />
    </>
  );
};

import { Switch, SwitchProps } from '@mui/material';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

type ISwitchFieldProps = Omit<SwitchProps, 'error' | 'required'> & {
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
};

export const SwitchField = (props: ISwitchFieldProps) => {
  const { name, rules, ...rest } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        render={({ field: { value, ...restFields } }) => (
          <Switch {...rest} {...restFields} checked={value} />
        )}
        control={control}
        name={name}
        rules={rules}
      />
    </>
  );
};

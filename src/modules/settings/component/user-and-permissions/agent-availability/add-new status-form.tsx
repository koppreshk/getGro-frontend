import { Button, Grid } from '@mui/material';
import { SelectField, TextboxField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { MuiColorInput } from 'mui-color-input';
import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface IUserFormFields {
  statusName: string;
  statusCategory: string;
}

interface IUserFormProps {
  mode: 'create' | 'edit';
  defaultValues?: IUserFormFields;
  onFormSubmitHandler: (data: IUserFormFields) => void;
}

export const AddNewStatusForm = (props: IUserFormProps) => {
  const { mode, defaultValues, onFormSubmitHandler } = props;
  const isInEditMode = useMemo(() => mode === 'edit', [mode]);
  const { t } = useTranslation();

  const methods = useForm<IUserFormFields>({
    defaultValues: defaultValues ?? {
      statusName: '',
      statusCategory: '',
    },
  });

  const [value, setValue] = React.useState('#76e96c');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = useCallback(
    async (formvalues: IUserFormFields) => {
      onFormSubmitHandler(formvalues);
    },
    [onFormSubmitHandler]
  );

  return (
    <FormProvider {...methods}>
      <FlexBox
        padding="20px"
        width="100%"
        height="calc(100% - 77px)"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextboxField
              name="statusName"
              label="Status Name"
              fullWidth
              rules={{ required: 'Status name is required' }}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              sx={{ width: '100%' }}
              name="statusCategory"
              label="Status Category"
              menuOptions={[
                { key: 'online', value: 'Online' },
                { key: 'offline', value: 'Offline' },
              ]}
              fullWidth
              rules={{ required: 'Selection is required' }}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiColorInput
              sx={{ width: '100%' }}
              label="Status Color"
              format="hex"
              value={value}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <FlexBox gap="10px" width="100%" justifyContent="flex-end">
          {isInEditMode ? (
            <Button
              variant="text"
              size="large"
              type="button"
              onClick={() => methods.reset()}
            >
              {t('reset')}
            </Button>
          ) : null}
          <Button
            variant="contained"
            size="large"
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >
            {isInEditMode ? 'Edit Status' : 'Add Status'}
          </Button>
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};

import { Button, Grid } from '@mui/material';
import { TextboxFieldWithLabel } from 'lib/form-fields';
import { CancelButton, FlexBox, LoadingButton } from 'lib/ui-ux';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { ITicketStatusFormFields } from 'modules/settings/containers/ticket-status';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ITicketStatusFormProps {
  mode: 'create' | 'edit';
  defaultValues?: ITicketStatusFormFields;
  mutationLoading: boolean;
  statusData?: IGenericResponse[];
  toggleDrawer: () => void;
  onFormSubmitHandler: (data: ITicketStatusFormFields) => void;
}

export const TicketStatusForm = (props: ITicketStatusFormProps) => {
  const {
    mode,
    defaultValues,
    mutationLoading,
    statusData,
    toggleDrawer,
    onFormSubmitHandler,
  } = props;
  const isInEditMode = useMemo(() => mode === 'edit', [mode]);
  const { t } = useTranslation();

  const methods = useForm<ITicketStatusFormFields>({
    defaultValues: defaultValues ?? {
      ticketStatusName: '',
    },
  });

  const onSubmit = useCallback(
    async (formvalues: ITicketStatusFormFields) => {
      onFormSubmitHandler(formvalues);
    },
    [onFormSubmitHandler]
  );

  const validateStatus = (value: string) => {
    const modifiedData =
      mode === 'edit'
        ? statusData?.filter(
            (item) => item.name !== defaultValues?.ticketStatusName
          )
        : statusData;
    const doesNameExist = modifiedData?.some((item) => item.name === value);
    if (doesNameExist) {
      return t('value_exists_validation', { value });
    }
  };

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
            <TextboxFieldWithLabel
              name="ticketStatusName"
              label={t('name')}
              fullWidth
              rules={{
                required: t('ticket_status_required'),
                validate: validateStatus,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextboxFieldWithLabel
              name="ticketStatusDescription"
              label={t('description')}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            {isInEditMode ? (
              <TextboxFieldWithLabel
                name="ticketStatusId"
                label={t('id')}
                fullWidth
                disabled
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <FlexBox gap="10px" width="100%" justifyContent="flex-end">
          <CancelButton onClick={toggleDrawer} />
          {isInEditMode ? (
            <Button
              variant="outlined"
              size="large"
              type="button"
              onClick={() => methods.reset()}
            >
              {t('reset')}
            </Button>
          ) : null}
          <LoadingButton
            isLoading={mutationLoading}
            variant="contained"
            size="large"
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >
            {isInEditMode ? t('edit_ticket_label') : t('add_ticket_label')}
          </LoadingButton>
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};

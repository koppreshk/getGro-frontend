import { Button, Grid, Typography } from '@mui/material';
import { RichTextEditorField, TextboxFieldWithLabel } from 'lib/form-fields';
import { FlexBox, LoadingButton } from 'lib/ui-ux';
import { IGenericResponse } from 'modules/settings/apis/templates/types';
import { ITemplatesFormFields } from 'modules/settings/containers/templates';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { PlaceHolders } from './placeholders';

interface ITemplatesFormProps {
  mode: 'create' | 'edit';
  defaultValues?: ITemplatesFormFields;
  mutationLoading: boolean;
  statusData?: IGenericResponse[];
  onFormSubmitHandler: (data: ITemplatesFormFields) => void;
}

export const StyledRichTextEditor = styled(RichTextEditorField)`
  border: 1px solid ${({ theme }) => theme.pallete.formFieldBorderColor};
  border-radius: 4px;
  &:hover {
    .ql-toolbar {
      border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
    }
    border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
  }
  &:focus-within {
    .ql-toolbar {
      border-bottom: 2px solid ${({ theme }) => theme.pallete.primaryPurple};
    }
    border: 2px solid ${({ theme }) => theme.pallete.primaryPurple};
  }
`;

export const TemplatesForm = (props: ITemplatesFormProps) => {
  const { mode, defaultValues, mutationLoading, statusData } = props;
  const isInEditMode = useMemo(() => mode === 'edit', [mode]);
  const { t } = useTranslation();

  const methods = useForm<ITemplatesFormFields>({
    defaultValues: defaultValues ?? {
      name: '',
      template: '',
    },
  });

  const validateTitle = (value: string) => {
    const modifiedData =
      mode === 'edit'
        ? statusData?.filter((item) => item.name !== defaultValues?.name)
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
              name="name"
              label="Title"
              fullWidth
              rules={{ required: 'Title is required', validate: validateTitle }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '5px' }}>
              {t('placeholders')}
            </Typography>
            <PlaceHolders />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '5px' }}>
              {t('description')}
            </Typography>
            <StyledRichTextEditor name={`template`} disableAutoFocus />
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '5px' }}>
              {t('access_scope')}
            </Typography>
            <RadioGroupField
              name="accessScope"
              sx={{ gap: '10px' }}
              radioOptions={[
                { key: 'private', label: 'Private' },
                { key: 'public', label: 'Public' },
              ]}
            />
          </Grid> */}
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
          <LoadingButton
            isLoading={mutationLoading}
            variant="contained"
            size="large"
            type="submit"
            // onClick={methods.handleSubmit(onSubmit)}
          >
            {isInEditMode ? 'Edit Template' : 'Add Template'}
          </LoadingButton>
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};

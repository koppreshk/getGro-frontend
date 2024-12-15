import { CopyAll } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import { useNotifications } from 'lib';
import {
  ColorInputField,
  TextboxField,
  TextboxFieldWithLabel,
} from 'lib/form-fields';
import { FlexBox, HorizontalSeparator, LoadingButton } from 'lib/ui-ux';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PreviewForm } from './preview-form';

export interface WebFormFields {
  webFormName: string;
  formTitle: string;
  formDescription: string;
  footerMessage: string;
  confirmationMessage: string;
  submitBtnName: string;
  backgroundColor: string;
  textColor: string;
  formHeight: number;
}

interface AddWebFormProps {
  mode?: string;
  mutationLoading: boolean;
  token?: string;
  defaultValues?: WebFormFields;
  onSubmit: (formData: WebFormFields) => Promise<any>;
}

export const AddWebForm = (props: AddWebFormProps) => {
  const { mode = 'add', onSubmit, defaultValues, token } = props;

  const form = useForm<WebFormFields>({
    defaultValues: defaultValues ?? {
      formTitle: 'Help & Support',
      backgroundColor: '#6a69f6',
      textColor: '#fff',
      submitBtnName: 'Submit',
      formHeight: 400,
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showNotification } = useNotifications();

  const navigateBack = () => navigate(-1);
  const embedCode = `
    <iframe src="${import.meta.env.VITE_SUB_DOMAIN}contact-us/${token}" height="${form.watch('formHeight')}" frameborder="0"></iframe>
    `;

  const onCopy = () => {
    navigator.clipboard
      .writeText(embedCode.trim())
      .then(() =>
        showNotification({ message: t('copied_to_clipboard'), type: 'success' })
      )
      .catch(() =>
        showNotification({ message: t('failed_to_copy'), type: 'error' })
      );
  };

  return (
    <FormProvider {...form}>
      <FlexBox
        overflowY="auto"
        height="90%"
        padding="20px"
        gap={'80px'}
        width="100%"
      >
        <FlexBox flexDirection="column" gap={'20px'} width="40%">
          <TextboxFieldWithLabel
            name="webFormName"
            label={t('web_form_name')}
            rules={{ required: t('name_is_required') }}
          />
          <TextboxFieldWithLabel name="formTitle" label={t('form_title')} />
          <TextboxFieldWithLabel
            name="formDescription"
            label={t('form_description')}
            rows={2}
            multiline
          />
          <TextboxFieldWithLabel
            name="footerMessage"
            label={t('footer_message')}
            rows={2}
            multiline
          />
          <TextboxFieldWithLabel
            name="confirmationMessage"
            label={t('confirmation_message')}
            rows={2}
            multiline
          />
          <HorizontalSeparator />
          <FlexBox flexDirection="column" gap={'20px'}>
            <Typography variant="h5">{t('submit_btn')}</Typography>
            <TextboxFieldWithLabel
              name="submitBtnName"
              label={t('submit_btn_name')}
            />
            <FlexBox gap={'20px'}>
              <ColorInputField
                name="backgroundColor"
                label={t('background_color')}
                sx={{ width: 'calc(33% - 20px)' }}
              />
              <ColorInputField
                name="textColor"
                label={t('text_color')}
                sx={{ width: '33%' }}
              />
              <div style={{ width: '33%' }}>
                <TextboxField
                  name={'formHeight'}
                  label={t('form_height')}
                  type="number"
                  rules={{ min: 1 }}
                />
              </div>
            </FlexBox>
          </FlexBox>
          {mode === 'edit' ? (
            <Accordion
              disableGutters
              defaultExpanded
              sx={{
                boxShadow: 'none',
                border: '1px solid #E9EBED',
                borderRadius: '8px',
              }}
              expanded={true}
            >
              <AccordionSummary
                id="panel-header"
                aria-controls="panel-content"
                expandIcon={<CopyAll onClick={onCopy} />}
                sx={{ background: '#f7f8f9', borderRadius: '8px' }}
              >
                <Typography variant="h6">{t('embed_code')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <code>{embedCode}</code>
              </AccordionDetails>
            </Accordion>
          ) : null}
        </FlexBox>
        <div
          style={{
            background: '#eaebec',
            width: '40%',
            height: 'min-content',
            padding: '40px',
            borderRadius: '6px',
          }}
        >
          <Typography variant="h6" sx={{ mb: '15px' }}>
            {t('preview')}
          </Typography>
          <PreviewForm
            formTitle={form.watch('formTitle')}
            formDescription={form.watch('formDescription')}
            btnBgColor={form.watch('backgroundColor')}
            btnTextColor={form.watch('textColor')}
            footerMessage={form.watch('footerMessage')}
            submitBtnName={form.watch('submitBtnName')}
          />
        </div>
      </FlexBox>
      <FlexBox gap={'20px'} padding="20px">
        <LoadingButton
          isLoading={props.mutationLoading}
          variant="contained"
          onClick={form.handleSubmit(onSubmit)}
        >
          {mode === 'edit' ? t('edit_web_form') : t('add_web_form')}
        </LoadingButton>
        <Button variant="outlined" onClick={navigateBack}>
          {t('cancel')}
        </Button>
      </FlexBox>
    </FormProvider>
  );
};

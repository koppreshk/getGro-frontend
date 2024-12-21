import { Grid, Typography } from '@mui/material';
import {
  CheckboxField,
  RadioGroupField,
  TextboxFieldWithLabel,
} from 'lib/form-fields';
import {
  CancelButton,
  FlexBox,
  HorizontalSeparator,
  LoadingButton,
} from 'lib/ui-ux';
import { StyledRichTextEditor } from 'modules/settings/component/ticket-configurations/templates/add-templates-form';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { QueueOptions } from './queue-options';
import { SplitTicketProps } from './split-ticket';

interface ISplitTicketsContentProps
  extends Omit<SplitTicketProps, 'showSplitTicketDrawer'> {
  mutationLoading: boolean;
  onSubmit: (formData: ISplitTicketsFormFields) => void;
}

export interface ISplitTicketsFormFields {
  subject: string;
  description: string;
  assignee: 'auto' | 'manual';
  queueId: string;
  employeeId: string;
  associationWithTicket: 'link_ticket' | 'no_associate';
  copyAttachments: boolean;
}

export const StyledRadioGroupFields = styled(RadioGroupField)`
  .MuiRadio-sizeSmall {
    padding: 6px 9px;
  }
  .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;

export const SplitTicketsContent = (props: ISplitTicketsContentProps) => {
  const { mutationLoading, emailProps, onCloseDrawer, onSubmit } = props;
  const { subject, htmlContent } = emailProps;
  const methods = useForm<ISplitTicketsFormFields>({
    defaultValues: {
      subject,
      description: htmlContent,
      assignee: 'auto',
      associationWithTicket: 'link_ticket',
      copyAttachments: false,
    },
    mode: 'onBlur',
  });
  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <FlexBox
        flexDirection="column"
        width="100%"
        padding="20px"
        gap={'20px'}
        overflowY="auto"
      >
        <TextboxFieldWithLabel name="subject" label={t('subject')} />
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: '5px' }}>
            {t('description')}
          </Typography>
          <StyledRichTextEditor name={`description`} disableAutoFocus />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: '5px' }}>
            {t('assignee')}
          </Typography>
          <StyledRadioGroupFields
            name="assignee"
            row={false}
            sx={{ width: '100%' }}
            radioOptions={[
              { key: 'auto', label: t('auto_assign') },
              {
                key: 'manual',
                label: t('select_agent'),
                renderContentBelowLabel: () =>
                  methods.watch('assignee') === 'manual' ? (
                    <QueueOptions />
                  ) : null,
              },
            ]}
          />
        </Grid>
        <HorizontalSeparator />
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: '5px' }}>
            {t('association_with_current_ticket')}
          </Typography>
          <StyledRadioGroupFields
            name="associationWithTicket"
            row={false}
            sx={{ width: '100%' }}
            radioOptions={[
              { key: 'no_association', label: t('no_association') },
              { key: 'link_ticket', label: t('link_ticket') },
            ]}
          />
        </Grid>
        <HorizontalSeparator />
        <FlexBox alignItems="center">
          <CheckboxField
            name="copyAttachments"
            sx={{ padding: '0 9px 0px 0px' }}
          />
          <Typography variant="body2">
            {t('copy_attachment_from_current')}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox padding="20px" gap="10px" width="100%" justifyContent="flex-end">
        <CancelButton onClick={onCloseDrawer} />
        <LoadingButton
          isLoading={mutationLoading}
          variant="contained"
          size="large"
          type="submit"
          onClick={methods.handleSubmit(onSubmit)}
        >
          {t('split_ticket')}
        </LoadingButton>
      </FlexBox>
    </FormProvider>
  );
};

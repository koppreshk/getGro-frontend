import { Button, Grid, Typography } from '@mui/material';
import {
  SelectField,
  TextboxFieldWithLabel,
  validateAtLeastOneChar,
} from 'lib/form-fields';
import { TagInputField } from 'lib/form-fields/tag-input-field';
import { FlexBox, ITagInput, LoadingButton } from 'lib/ui-ux';
import { ITag } from 'modules/settings/apis/tags';
import { StyledRichTextEditor } from 'modules/settings/component/ticket-configurations/canned-response/add-canned-response-form';
import { IPriorities } from 'modules/tickets/apis';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { StyledRadioGroupFields } from '../../ticket-conversation/email-conversations/more-actions/split-ticket';
import { QueueOptions } from '../../ticket-conversation/email-conversations/more-actions/split-ticket/queue-options';

interface IAddTicketFormProps {
  priorities: IPriorities[];
  allTags: ITag[];
  mutationLoading: boolean;
  toggleAddTicketDrawer: () => void;
  onSubmit: (formData: IAddTIcketFormFields) => void;
}

export const StyledTagInputField = styled(TagInputField)`
  padding: 16.5px 14px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
  border: 1px solid ${({ theme }) => theme.pallete.formFieldBorderColor};
  width: 100%;
  &:hover {
    border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
  }
  input {
    min-width: 155px;
  }
`;

export interface IAddTIcketFormFields {
  requesterEmail: string;
  subject: string;
  priority: string;
  template: string;
  assignee: 'auto' | 'manual';
  queueId: string;
  employeeId: string;
  tags: ITagInput[];
}

export const AddTicketForm = (props: IAddTicketFormProps) => {
  const {
    priorities,
    allTags,
    mutationLoading,
    onSubmit,
    toggleAddTicketDrawer,
  } = props;
  const { t } = useTranslation();
  const formMethods = useForm<IAddTIcketFormFields>({
    defaultValues: {
      priority: priorities[0].id.toString(),
      requesterEmail: '',
      subject: '',
      template: '',
      assignee: 'auto',
      employeeId: '',
      queueId: '',
      tags: [],
    },
  });

  const associatedTags = formMethods.watch('tags');
  const suggestedTags: ITagInput[] = allTags.filter(
    (tag) =>
      !associatedTags.some((associatedTag) => associatedTag.id === tag.id)
  );

  return (
    <FormProvider {...formMethods}>
      <FlexBox
        flexDirection="column"
        width="100%"
        padding="20px"
        justifyContent="space-between"
        height="calc(100% - 78px)"
        gap={'20px'}
      >
        <FlexBox
          gap="20px"
          flexDirection="column"
          overflowY="auto"
          maxHeight="calc(100% - 57px)"
          padding="0 10px 0px 0px"
        >
          <TextboxFieldWithLabel
            name="requesterEmail"
            type="email"
            label={t('requester_email')}
            rules={{ required: t('requester_email_validation') }}
          />
          <TextboxFieldWithLabel
            name="subject"
            label={t('subject')}
            rules={{ required: t('subject_validation') }}
          />
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '5px' }}>
              {t('priority')}
            </Typography>
            <SelectField
              name="priority"
              sx={{ width: '100%' }}
              menuOptions={priorities.map((item) => ({
                key: item.id.toString(),
                value: item.name,
              }))}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '5px' }}>
              {t('description')}
            </Typography>
            <StyledRichTextEditor
              name={`template`}
              disableAutoFocus
              rules={{
                required: t('description_validation'),
                validate: validateAtLeastOneChar,
              }}
            />
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
                    formMethods.watch('assignee') === 'manual' ? (
                      <QueueOptions />
                    ) : null,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '5px' }}>
              {t('tags')}
            </Typography>
            <StyledTagInputField
              gap={'15px'}
              name="tags"
              allowToAddTagsViaText={false}
              allowSuggestions
              suggestedTags={suggestedTags}
            />
          </Grid>
        </FlexBox>
        <FlexBox justifyContent="flex-end" gap={'20px'} padding="0 30px 0 0">
          <Button variant="outlined" onClick={toggleAddTicketDrawer}>
            {t('cancel')}
          </Button>
          <LoadingButton
            isLoading={mutationLoading}
            variant="contained"
            onClick={formMethods.handleSubmit(onSubmit)}
          >
            {t('submit')}
          </LoadingButton>
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};

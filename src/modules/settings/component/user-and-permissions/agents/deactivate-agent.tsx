import { NotInterestedOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { RadioGroupField } from 'lib/form-fields';
import { FlexBox, NegativeActionDialog, CustomIconButton } from 'lib/ui-ux';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { ReassignForm } from './reassign-form';

interface DeactivateAgentDialogProps {
  canDeactivate: boolean;
  mutationLoading: boolean;
  onDeleteHandler: (formData: DeactivateAgentDialogFormFields) => void;
}

export const DeactivateAgent = (props: DeactivateAgentDialogProps) => {
  const { onDeleteHandler, mutationLoading } = props;
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <CustomIconButton
        iconComponent={<NotInterestedOutlined />}
        tooltipProps={{ title: t('deactivate') }}
        onClick={toggleDeleteDialogBox}
      />
      <DeactivateAgentDialog
        open={open}
        mutationLoading={mutationLoading}
        onDeleteHandler={onDeleteHandler}
        toggleDeleteDialogBox={toggleDeleteDialogBox}
        canDeactivate={props.canDeactivate}
      />
    </>
  );
};

export interface DeactivateAgentDialogFormFields {
  deactivateAgent:
    | 'remove_assignee_and_groups'
    | 'deactivate_and_reassign_tickets'
    | 'remove_assignee_only';
  queue_id: string;
  reassign_to: string;
}

const DeactivateAgentDialog = (
  props: DeactivateAgentDialogProps & {
    open: boolean;
    toggleDeleteDialogBox: () => void;
  }
) => {
  const {
    open,
    canDeactivate,
    mutationLoading,
    onDeleteHandler,
    toggleDeleteDialogBox,
  } = props;
  const form = useForm<DeactivateAgentDialogFormFields>({
    defaultValues: {
      deactivateAgent: 'remove_assignee_and_groups',
    },
  });
  const { t } = useTranslation();

  const onNegativeActionClick = (formData: DeactivateAgentDialogFormFields) => {
    onDeleteHandler(formData);
  };

  return (
    <FormProvider {...form}>
      <NegativeActionDialog
        open={open}
        isLoading={mutationLoading}
        content={
          canDeactivate ? (
            <DeactivateAgentWithNoTickets />
          ) : (
            <DeactivateAgentForm />
          )
        }
        title={t('deactivate_agent')}
        negativeActionLabel={t('deactivate')}
        onNegativeActionClick={form.handleSubmit(onNegativeActionClick)}
        onClose={toggleDeleteDialogBox}
      />
    </FormProvider>
  );
};

const StyledRadioFields = styled(RadioGroupField)`
  .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;

const DeactivateAgentWithNoTickets = () => {
  const { t } = useTranslation();

  return (
    <FlexBox flexDirection="column" gap={'15px'}>
      <Typography variant="body2">{t('deactivate_agent_msg1')}</Typography>
      <Typography variant="body2">
        {t('deactivate_agent_confirmation')}
      </Typography>
    </FlexBox>
  );
};

const DeactivateAgentForm = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  return (
    <FlexBox gap={'15px'} flexDirection="column" width="500px">
      <Typography variant="body2">{t('deactivate_agent_header')}</Typography>
      <StyledRadioFields
        name="deactivateAgent"
        row={false}
        radioOptions={[
          {
            key: 'remove_assignee_and_groups',
            label: t('remove_assignee_and_groups'),
          },
          {
            key: 'deactivate_and_reassign_tickets',
            label: t('deactivate_and_reassign_tickets'),
            renderContentBelowLabel: () =>
              watch('deactivateAgent') === 'deactivate_and_reassign_tickets' ? (
                <ReassignForm />
              ) : null,
          },
          {
            key: 'remove_assignee_only',
            label: t('remove_assignee_only'),
          },
        ]}
      />
    </FlexBox>
  );
};

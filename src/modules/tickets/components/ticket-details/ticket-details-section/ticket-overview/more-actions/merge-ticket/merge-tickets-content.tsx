import { Typography } from '@mui/material';
import { useNotifications } from 'lib';
import { CheckboxField, RadioGroupField } from 'lib/form-fields';
import { useAppSelector } from 'lib/hooks';
import { CancelButton, FlexBox, LoadingButton } from 'lib/ui-ux';
import { ITicketDetails, useSearchTickets } from 'modules/tickets/apis';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PrimaryTicketDetails } from './primary-ticket-details';

const StyledFooter = styled(FlexBox)`
  border-top: ${({ theme }) => theme.semantics.standardBorder};
`;

const StyledRadioFields = styled(RadioGroupField)`
  .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;

export interface IMergeTicketsFormFields {
  addSecondaryTicketMessage: 'first_message' | 'last_message';
  closeSecondaryTicket: boolean;
  addSecondaryLinkInPrimary: boolean;
  sendMail: boolean;
  searchTickets?: Pick<
    ITicketDetails,
    'customerName' | 'ticketId' | 'ticketStatus' | 'description'
  >[];
}

interface IMergeTicketsContentProps {
  mutationLoading: boolean;
  onCloseDrawer: () => void;
  submitMergeTicketHandler: (
    formData: IMergeTicketsFormFields & { primaryTicketId: number }
  ) => Promise<{ status: boolean; message: string }>;
}

const AdditionalOptions = () => {
  const { t } = useTranslation();
  return (
    <>
      <FlexBox flexDirection="column">
        <FlexBox alignItems="center">
          <CheckboxField
            name="addSecondaryLinkInPrimary"
            sx={{ padding: '6px 9px' }}
          />
          <Typography variant="body2">
            <Trans i18nKey={'add_a_secondary_ticket'} />
          </Typography>
        </FlexBox>
        <FlexBox alignItems="center">
          <CheckboxField
            name="closeSecondaryTicket"
            sx={{ padding: '6px 9px' }}
          />
          <Typography variant="body2">
            <Trans i18nKey={'after_the_merge'} />
          </Typography>
        </FlexBox>
        <FlexBox alignItems="center">
          <CheckboxField name="sendMail" sx={{ padding: '6px 9px' }} />
          <Typography variant="body2">
            <Trans i18nKey={'dont_send_email'} />
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox flexDirection="column" style={{ marginLeft: '14px' }}>
        <Typography variant="h6">
          <Trans i18nKey={'add_secondary_ticket'} />
        </Typography>
        <StyledRadioFields
          name="addSecondaryTicketMessage"
          radioOptions={[
            { key: 'first_message', label: t('first_message') },
            { key: 'last_message', label: t('last_message') },
          ]}
        />
      </FlexBox>
    </>
  );
};

export const MergeTicketsContent = (props: IMergeTicketsContentProps) => {
  const { mutationLoading, submitMergeTicketHandler, onCloseDrawer } = props;
  const { mutateAsync, data, isLoading } = useSearchTickets();
  const ticketDetails = useAppSelector((state) => state.tickets.ticketDetails);
  const { description, ticketId, ticketStatus, customerName } = ticketDetails!;
  const { showNotification } = useNotifications();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    mutateAsync({
      search_text: ev.target.value,
      current_ticket_id: ticketId,
    });
  };

  const methods = useForm<IMergeTicketsFormFields>({
    defaultValues: {
      addSecondaryTicketMessage: 'last_message',
      addSecondaryLinkInPrimary: true,
      closeSecondaryTicket: true,
      searchTickets: [],
      sendMail: false,
    },
    mode: 'onBlur',
  });

  const onSubmit = (formData: IMergeTicketsFormFields) => {
    submitMergeTicketHandler({ ...formData, primaryTicketId: ticketId })
      .then((res) => {
        if (res.status) {
          onCloseDrawer();
          showNotification({
            message: 'Ticket merge was successfull',
            type: 'success',
          });
        } else {
          showNotification({ message: res.message, type: 'error' });
        }
      })
      .catch(() =>
        showNotification({ message: 'Failed to merge tickets', type: 'error' })
      );
  };

  return (
    <FormProvider {...methods}>
      <FlexBox
        flexDirection="column"
        justifyContent="space-between"
        height="calc(100% - 77px)"
      >
        <PrimaryTicketDetails
          onChange={onChange}
          data={data}
          isLoading={isLoading}
          ticketDetails={{
            description,
            ticketId,
            ticketStatus,
            customerName,
          }}
        />
        <StyledFooter
          padding="20px"
          width="100%"
          gap="12px"
          flexDirection="column"
        >
          <AdditionalOptions />
          <FlexBox gap="10px" width="100%" justifyContent="flex-end">
            <CancelButton onClick={onCloseDrawer} />
            <LoadingButton
              isLoading={mutationLoading}
              variant="contained"
              size="large"
              type="submit"
              onClick={methods.handleSubmit(onSubmit)}
            >
              <Trans i18nKey={'merge_ticket'} />
            </LoadingButton>
          </FlexBox>
        </StyledFooter>
      </FlexBox>
    </FormProvider>
  );
};

import { ErrorMessage } from '@hookform/error-message';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Autocomplete,
  CircularProgress,
  TextField,
  debounce,
} from '@mui/material';
import { t } from 'i18next';
import { useNotifications } from 'lib';
import { StyledErrorMessage } from 'lib/form-fields';
import { useAppSelector } from 'lib/hooks';
import { FlexBox, LoadingButton } from 'lib/ui-ux';
import { useLinkTicket } from 'modules/chats/apis';
import { ISearchTickets, useSearchTickets } from 'modules/tickets/apis';
import { TicketInfo } from 'modules/tickets/components/ticket-details/ticket-details-section/ticket-overview/more-actions/merge-ticket/ticket-info';
import React from 'react';
import {
  Controller,
  FormProvider,
  get,
  useForm,
  useFormContext,
} from 'react-hook-form';

interface LinkTicketDialogProps {
  openLinkTicketDialog: boolean;
  toggleLinkTicketDialog: () => void;
}

interface ISearchFormFields {
  searchTickets: {
    customerName: string;
    ticketId: number;
    description: string;
    ticketStatus: string;
  }[];
}

const SearchTickets = (props: {
  isLoading: boolean;
  data?: ISearchTickets;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const { data, isLoading, onChange } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const hasError = get(errors, 'searchTickets') !== undefined;

  const validateField = (val: []) => {
    if (val.length <= 0) {
      return t('merge_ticket_validation');
    }
  };

  const debouncedChange = debounce(onChange, 500);

  return (
    <FlexBox flexDirection="column" gap={'5px'} width="400px">
      <Controller
        render={({ field: { onChange: formOnChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            id="grouped-demo"
            isOptionEqualToValue={(option, value) =>
              option.ticketId === value.ticketId
            }
            options={data?.data || []}
            multiple
            sx={{ width: '100%' }}
            filterOptions={(x) => x}
            disableCloseOnSelect
            onChange={(_ev, newValue) => formOnChange(newValue)}
            getOptionLabel={(option) => option.description}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                title={t('search_secondary_placeholder')}
                placeholder={t('search_secondary_placeholder')}
                size="small"
                autoFocus
                type="search"
                error={hasError}
                required={true}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                onChange={debouncedChange}
              />
            )}
            renderOption={(optionProps, option, { selected }) => {
              return (
                <li {...optionProps} key={option.ticketId}>
                  <TicketInfo
                    multiSelect
                    checked={selected}
                    ticketDetails={{
                      customerName: option.customerName,
                      description: option.description,
                      ticketStatus: option.ticketStatus,
                      ticketId: option.ticketId,
                    }}
                  />
                </li>
              );
            }}
          />
        )}
        control={control}
        name={'searchTickets'}
        rules={{ validate: validateField }}
      />
      <ErrorMessage
        errors={errors}
        name={'searchTickets'}
        as={StyledErrorMessage}
      />
    </FlexBox>
  );
};

export const LinkTicketDialog = (props: LinkTicketDialogProps) => {
  const { openLinkTicketDialog, toggleLinkTicketDialog } = props;
  const form = useForm<ISearchFormFields>();
  const { mutateAsync, data, isLoading } = useSearchTickets();
  const { mutateAsync: linkTicket, isLoading: mutationLoading } =
    useLinkTicket();
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { showNotification } = useNotifications();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    mutateAsync({
      search_text: ev.target.value,
    });
  };

  const onSubmit = (formvalues: ISearchFormFields) => {
    linkTicket({
      conversation_id: chatDetails!.id,
      ticket_ids: formvalues.searchTickets.map((item) => item.ticketId),
    })
      .then(() =>
        showNotification({ message: t('link_ticket_success'), type: 'success' })
      )
      .catch(() =>
        showNotification({ message: t('link_ticket_failure'), type: 'error' })
      )
      .finally(() => toggleLinkTicketDialog());
  };

  return (
    <FormProvider {...form}>
      <Dialog
        open={openLinkTicketDialog}
        maxWidth={'md'}
        onClose={toggleLinkTicketDialog}
      >
        <DialogTitle variant="h5">{t('link_tickets')}</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body3">
            <SearchTickets
              data={data}
              isLoading={isLoading}
              onChange={onChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            onClick={toggleLinkTicketDialog}
            variant="outlined"
            sx={{ mr: '8px' }}
          >
            {t('cancel')}
          </Button>
          <LoadingButton
            isLoading={mutationLoading}
            type="submit"
            variant="contained"
            onClick={form.handleSubmit(onSubmit)}
          >
            {t('submit')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

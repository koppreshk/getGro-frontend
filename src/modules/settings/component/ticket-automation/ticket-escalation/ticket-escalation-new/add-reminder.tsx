import { Grid, Typography } from '@mui/material';
import { AutocompleteField, SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import {
  IQueue,
  IReminderTime,
  IUser,
} from 'modules/settings/apis/ticket-automation/escalations/fetch-sla-metadata';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled(FlexBox)`
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  border: ${({ theme }) => theme.semantics.standardBorder};
`;

const HeaderLabel = styled(FlexBox)`
  margin-bottom: 12px;
`;

interface IAddReminderProps {
  reminderTimes: IReminderTime[];
  queueList: IQueue[];
  userList: IUser[];
}

export const AddReminder = (props: IAddReminderProps) => {
  const { queueList, reminderTimes, userList } = props;
  const { t } = useTranslation();

  return (
    <FlexBox flexDirection="column" gap="15px">
      <Typography variant="h5"> {t('add_reminders_header_label')}</Typography>
      <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
        <Typography variant="h5">{t('first_response_reminder')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <HeaderLabel>
              <Typography variant="body2">
                {' '}
                {t('first_response_label')}{' '}
              </Typography>
            </HeaderLabel>
            <SelectField
              name="addReminders.ftrDuration"
              menuOptions={reminderTimes.map((data) => ({
                key: data.id.toString(),
                value: data.name,
              }))}
              sx={{ width: '100%' }}
              label={t('duration')}
            />
          </Grid>
          <Grid item xs={8}>
            <HeaderLabel>
              <Typography variant="body2"> {t('send_reminder_to')} </Typography>
            </HeaderLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('queue')}
                  name="addReminders.ftrGroup"
                  options={queueList.map((data) => ({
                    key: data.id.toString(),
                    value: data.name,
                  }))}
                  placeholder={t('queue')}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('agent')}
                  name="addReminders.ftrAgent"
                  options={userList.map((data) => ({
                    key: data.id.toString(),
                    value: `${data.firstName} ${data.lastName ?? ''}`,
                  }))}
                  placeholder={t('agent')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>

      <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
        <Typography variant="h5">{t('next_response_reminder')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <HeaderLabel>
              <Typography variant="body2">
                {' '}
                {t('next_response_label')}{' '}
              </Typography>
            </HeaderLabel>
            <SelectField
              name="addReminders.ntrDuration"
              menuOptions={reminderTimes.map((data) => ({
                key: data.id.toString(),
                value: data.name,
              }))}
              sx={{ width: '100%' }}
              label={t('duration')}
            />
          </Grid>
          <Grid item xs={8}>
            <HeaderLabel>
              <Typography variant="body2"> {t('send_reminder_to')} </Typography>
            </HeaderLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('queue')}
                  name="addReminders.ntrGroup"
                  options={queueList.map((data) => ({
                    key: data.id.toString(),
                    value: data.name,
                  }))}
                  placeholder={t('queue')}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('agent')}
                  name="addReminders.ntrAgent"
                  options={userList.map((data) => ({
                    key: data.id.toString(),
                    value: `${data.firstName} ${data.lastName ?? ''}`,
                  }))}
                  placeholder={t('agent')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>

      <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
        <Typography variant="h5">{t('resolution_reminder')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <HeaderLabel>
              <Typography variant="body2"> {t('resolution_label')} </Typography>
            </HeaderLabel>
            <SelectField
              name="addReminders.resolutionDuration"
              menuOptions={reminderTimes.map((data) => ({
                key: data.id.toString(),
                value: data.name,
              }))}
              sx={{ width: '100%' }}
              label={t('duration')}
            />
          </Grid>
          <Grid item xs={8}>
            <HeaderLabel>
              <Typography variant="body2"> {t('send_reminder_to')} </Typography>
            </HeaderLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('queue')}
                  name="addReminders.resolutionGroup"
                  options={queueList.map((data) => ({
                    key: data.id.toString(),
                    value: data.name,
                  }))}
                  placeholder={t('queue')}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('agent')}
                  name="addReminders.resolutionAgent"
                  options={userList.map((data) => ({
                    key: data.id.toString(),
                    value: `${data.firstName} ${data.lastName ?? ''}`,
                  }))}
                  placeholder={t('agent')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </FlexBox>
  );
};

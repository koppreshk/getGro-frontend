import { Grid, Typography } from '@mui/material';
import { AutocompleteField, SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import {
  IEscalationType,
  IQueue,
  IUser,
} from 'modules/settings/apis/ticket-automation/escalations/fetch-sla-metadata';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const Wrapper = styled(FlexBox)`
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  border: ${({ theme }) => theme.semantics.standardBorder};
`;

const HeaderLabel = styled(FlexBox)`
  margin-bottom: 12px;
`;

interface IAddEscalationProps {
  escalationTimes: IEscalationType[];
  queueList: IQueue[];
  userList: IUser[];
}

export const AddEscalation = (props: IAddEscalationProps) => {
  const { escalationTimes, queueList, userList } = props;
  const { t } = useTranslation();
  return (
    <FlexBox flexDirection="column" gap="15px">
      <Typography variant="h5">{t('add_escalation_header_label')}</Typography>
      <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
        <Typography variant="h5">{t('first_response_escalation')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <HeaderLabel>
              <Typography variant="body2">
                {' '}
                {t('first_response_escalation_note')}{' '}
              </Typography>
            </HeaderLabel>
            <SelectField
              name="addEscalation.ftrDuration"
              menuOptions={escalationTimes.map((data) => ({
                key: data.id.toString(),
                value: data.name,
              }))}
              sx={{ width: '100%' }}
              label={t('escalate')}
            />
          </Grid>
          <Grid item xs={8}>
            <HeaderLabel>
              <Typography variant="body2">{t('to')}</Typography>
            </HeaderLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('group')}
                  name="addEscalation.ftrGroup"
                  options={queueList.map((data) => ({
                    key: data.id.toString(),
                    value: data.name,
                  }))}
                  placeholder={t('group')}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('agent')}
                  name="addEscalation.ftrAgent"
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
        <Typography variant="h5">{t('next_response_escalation')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <HeaderLabel>
              <Typography variant="body2">
                {' '}
                {t('next_response_escalation_note')}{' '}
              </Typography>
            </HeaderLabel>
            <SelectField
              name="addEscalation.ntrDuration"
              menuOptions={escalationTimes.map((data) => ({
                key: data.id.toString(),
                value: data.name,
              }))}
              sx={{ width: '100%' }}
              label={t('escalate')}
            />
          </Grid>
          <Grid item xs={8}>
            <HeaderLabel>
              <Typography variant="body2"> {t('to')} </Typography>
            </HeaderLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('group')}
                  name="addEscalation.ntrGroup"
                  options={queueList.map((data) => ({
                    key: data.id.toString(),
                    value: data.name,
                  }))}
                  placeholder={t('group')}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('agent')}
                  name="addEscalation.ntrAgent"
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
        <Typography variant="h5">{t('resolution_escalation')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <HeaderLabel>
              <Typography variant="body2">
                {' '}
                {t('resolution_escalation_note')}{' '}
              </Typography>
            </HeaderLabel>
            <SelectField
              name="addEscalation.resolutionDuration"
              menuOptions={escalationTimes.map((data) => ({
                key: data.id.toString(),
                value: data.name,
              }))}
              sx={{ width: '100%' }}
              label={t('escalate')}
            />
          </Grid>
          <Grid item xs={8}>
            <HeaderLabel>
              <Typography variant="body2"> {t('to')} </Typography>
            </HeaderLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('group')}
                  name="addEscalation.resolutionGroup"
                  options={queueList.map((data) => ({
                    key: data.id.toString(),
                    value: data.name,
                  }))}
                  placeholder={t('group')}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteField
                  label={t('agent')}
                  name="addEscalation.resolutionAgent"
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

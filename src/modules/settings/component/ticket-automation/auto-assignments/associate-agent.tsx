import { CircularProgress, Typography } from '@mui/material';
import { RadioGroupField, SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { useFetchAllQueues } from 'modules/settings/apis/ticket-automation/escalations';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledRadioGroupFields = styled(RadioGroupField)`
  .MuiRadio-sizeSmall {
    padding: 0 9px;
  }
`;

export const AssociateAgent = () => {
  const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
  const { t } = useTranslation();
  return (
    <FlexBox flexDirection="column" gap={'24px'}>
      <ul style={{ paddingLeft: '15px' }}>
        <li style={{ marginBottom: '5px' }}>
          {t('associate_agent_description1')}
        </li>
        <li>{t('associate_agent_description2')}</li>
      </ul>
      <FlexBox gap={'10px'} flexDirection="column">
        <Typography variant="h4">{t('assignment_mode')}</Typography>
        <StyledRadioGroupFields
          name="assignmentMode"
          row={false}
          sx={{ gap: '10px' }}
          radioOptions={[
            {
              key: 'even_distribution',
              label: t('round_robin_even_distribution'),
              renderContentBelowLabel: t('even_distribution_among_agents'),
            },
            {
              key: 'load_based',
              label: t('round_robin_load_based'),
              renderContentBelowLabel: t('allocates_tickets_to_agents'),
            },
          ]}
        />
      </FlexBox>
      <FlexBox flexDirection="column" gap={'10px'}>
        <Typography variant="h6">{t('choose_a_queue')}</Typography>
        {isQueueLoading ? (
          <CircularProgress />
        ) : (
          <SelectField
            label={t('queue')}
            name="selectedQueue"
            sx={{ width: '20%' }}
            menuOptions={
              allQueues?.map((item) => ({
                key: item.id.toString(),
                value: item.name,
              })) || []
            }
            rules={{ required: t('queue_validation') }}
          />
        )}
      </FlexBox>
    </FlexBox>
  );
};

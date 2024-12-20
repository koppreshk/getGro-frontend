import { CircularProgress, Grid, Typography } from '@mui/material';
import { SelectField } from 'lib/form-fields';
import { useFetchAllTicketQueues } from 'modules/settings/apis';
import { GetEmployeesByQueueContainer } from 'modules/tickets/containers';
import { useFormContext } from 'react-hook-form';

export const QueueOptions = () => {
  const { data, isLoading: queueDataLoading } = useFetchAllTicketQueues();
  const { watch } = useFormContext();

  if (queueDataLoading) {
    return <CircularProgress />;
  }

  if (data) {
    return (
      <Grid
        item
        xs={12}
        container
        spacing={2}
        direction={'row'}
        sx={{ pl: '30px' }}
      >
        <Grid item xs={watch('queueId') ? 6 : 12}>
          <Typography variant="h6" sx={{ mb: '5px' }}>
            Select Queue
          </Typography>
          <SelectField
            name="queueId"
            sx={{ width: '100%' }}
            menuOptions={data.queues.map((item) => ({
              key: item.id.toString(),
              value: item.name,
            }))}
          />
        </Grid>
        <Grid item xs={6}>
          {watch('queueId') ? (
            <GetEmployeesByQueueContainer
              queueId={watch('queueId')!.toString()}
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }
};

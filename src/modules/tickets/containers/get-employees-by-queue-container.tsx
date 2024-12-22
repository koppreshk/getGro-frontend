import { Grid, Typography } from '@mui/material';
import { SelectField } from 'lib/form-fields';
import { CenteredCircularProgress } from 'lib/ui-ux';
import { useFetchUsersInQueue } from 'modules/settings/apis';

export const GetEmployeesByQueueContainer = (props: { queueId: string }) => {
  const { data, isLoading } = useFetchUsersInQueue(props.queueId);

  if (isLoading) {
    return (
      <CenteredCircularProgress height="auto" style={{ marginTop: '35px' }} />
    );
  }

  if (data) {
    return (
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: '5px' }}>
          Select Employee
        </Typography>
        <SelectField
          name="employeeId"
          sx={{ width: '100%' }}
          menuOptions={data.map((item) => ({
            key: item.id.toString(),
            value: `${item.firstName} ${item.lastName ? item.lastName : ''}`,
          }))}
        />
      </Grid>
    );
  }
};

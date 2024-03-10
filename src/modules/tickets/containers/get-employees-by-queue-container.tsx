import { Grid } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchUsersInQueue } from "modules/settings/apis";

export const GetEmployeesByQueueContainer = (props: { queueId: string }) => {
    const { data, isLoading } = useFetchUsersInQueue(props.queueId);

    if (isLoading) {
        return <CenteredCircularProgress height="auto"/>
    }

    if (data) {
        return (
            <Grid item xs={12}>
                <SelectField name="employeeId" label="Select Employee" sx={{ width: '100%' }} menuOptions={data.map((item) => ({ key: item.id.toString(), value: item.firstName }))} />
            </Grid>
        )
    }

}
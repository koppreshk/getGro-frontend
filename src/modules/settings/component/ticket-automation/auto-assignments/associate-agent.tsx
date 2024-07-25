import { CircularProgress, Typography } from "@mui/material"
import { RadioGroupField, SelectField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"
import { useFetchAllQueues } from "modules/settings/apis/escalations";
import styled from "styled-components";

const StyledRadioGroupFields = styled(RadioGroupField)`
    .MuiRadio-sizeSmall {
        padding: 0 9px;
    }
`;

export const AssociateAgent = () => {
    const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();

    return (
        <FlexBox flexDirection="column" gap={'24px'}>
            <ul style={{ paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>One active and available agent in the specified queue will be selected for assignment</li>
                <li>If the ticket, already has a Queue/Agent set, this rule will not trigger</li>
            </ul>
            <FlexBox gap={'10px'} flexDirection="column">
                <Typography variant="h4">Assignment Mode</Typography>
                <StyledRadioGroupFields
                    name="assignmentMode"
                    row={false}
                    sx={{ gap: '10px' }}
                    radioOptions={[
                        { key: 'round-robin-ed', label: 'Round Robin(Even Distribution)', subText: 'Evenly distributes tickets among agents.' },
                        { key: 'round-robin-lb', label: 'Round Robin(Load Based)', subText: 'Allocates tickets to agents based on their workload.' }]} />
            </FlexBox>
            <FlexBox flexDirection="column" gap={'10px'}>
                <Typography variant="h6">Choose a queue that is eligible for auto-assignment</Typography>
                {isQueueLoading
                    ? <CircularProgress />
                    : <SelectField label="Queue " name="selectedQueue" sx={{ width: '20%' }} menuOptions={allQueues?.map((item) => ({ key: item.id.toString(), value: item.name })) || []} rules={{ required: 'Please select a queue' }} />}
            </FlexBox>
        </FlexBox >
    )
}
import { Typography } from "@mui/material"
import { RadioGroupField, SelectField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components";

const StyledRadioGroupFields = styled(RadioGroupField)`
    .MuiRadio-sizeSmall {
        padding: 0 9px;
    }
`;

export const AssociateAgent = () => {
    return (
        <FlexBox flexDirection="column" gap={'20px'}>
            <ul>
                <li>One active and available agent in the specified group will be selected for assignment</li>
                <li>If the ticket, already has a Group/Agent set, this rule will not trigger</li>
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
            <FlexBox flexDirection="column" gap={'5px'}>
                <Typography>Choose a queue that is eligible for auto-assignment</Typography>
                <SelectField name="selectedQueue" sx={{ width: '20%' }} menuOptions={[]} rules={{ required: 'Please select a queue' }} />
            </FlexBox>
        </FlexBox>
    )
}
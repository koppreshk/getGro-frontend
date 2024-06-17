import { Box, Typography } from "@mui/material"
import { RadioGroupField, SelectField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";

const StyledRadioFields = styled(RadioGroupField)`
    .MuiFormControlLabel-label {
        font-size: 14px;
    }
`;

export const ChooseCondition = () => {
    return (
        <>
            <FlexBox width="100%" flexDirection="column" gap="20px">
                <TextboxField name="chooseCondition.name" label="Name" variant="outlined" rules={{ required: 'Name is required' }} />
                <TextboxField name="chooseCondition.description"
                    label="Description" variant="outlined"
                    multiline
                    rows={4}
                    maxRows={4} />
                <FlexBox flexDirection="column">
                    <Typography variant="h6">Calculate SLA Evaluation (Resolution due) when conditions are met from</Typography>
                    <StyledRadioFields name="chooseCondition.slaEvalutaion" radioOptions={[{ key: 'ticket-creation-time', label: 'Ticket creation time' }, { key: 'time-when-conditions-are-met', label: 'Time when conditions are met' }]} />
                </FlexBox>
                <Box
                    display="flex"
                    flexDirection='column'
                    gap={4}
                    p={2}
                    sx={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
                    <Typography variant="body2">Apply this SLA to the tickets that meet All of these conditions</Typography>
                    <Conditions />
                </Box>
            </FlexBox>
        </>
    )
}

const Conditions = () => {
    return (
        <Box
            display="flex"
            gap={4}
            p={2}
            sx={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
            <SelectField name="chooseCondition.ticketFields" menuOptions={[{ key: 'source', value: 'Source' }, { key: 'status', value: 'Status' }, { key: 'priority', value: 'Priority' }, { key: 'queues', value: 'Queues' }]} sx={{ width: '33%' }} />
            <SelectField name="chooseCondition.condition" menuOptions={[{ key: 'is', value: 'Is' }, { key: 'isNot', value: 'Is not' }, { key: 'in', value: 'In' }, { key: 'not', value: 'Not in' }]} sx={{ width: '33%' }} />
            <SelectField name="chooseCondition.conditionValue" menuOptions={[{ key: 'new', value: 'New' }, { key: 'open', value: 'Open' }, { key: 'new', value: 'New' }, { key: 'solved', value: 'Solved' }]} sx={{ width: '33%' }} />
        </Box>
    )
}
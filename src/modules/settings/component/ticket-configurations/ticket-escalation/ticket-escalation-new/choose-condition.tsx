import { Box, CircularProgress, Typography } from "@mui/material"
import { RadioGroupField, SelectField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import { useFetchAllStatuses } from "modules/settings/apis/disposition-types";
import { IField, IPriority, useFetchAllQueues } from "modules/settings/apis/escalations";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { IEscalationFormFields } from "./add-escalation-layout";
import { useFetchAllChannels } from "modules/settings/apis/tags";

const StyledRadioFields = styled(RadioGroupField)`
    .MuiFormControlLabel-label {
        font-size: 14px;
    }
`;

interface IKeyValue {
    key: string;
    value: string;
}

interface IChooseConditionProps {
    ticketField: IField[];
    priorities: IPriority[]
}

export const ChooseCondition = (props: IChooseConditionProps) => {
    const { ticketField } = props;
    const ticketFieldDropdownData = ticketField.map((data) => ({ key: data.id.toString(), value: data.name }))

    return (
        <>
            <FlexBox width="100%" flexDirection="column" gap="20px">
                <TextboxField name="chooseCondition.name" label="Name" variant="outlined" rules={{ required: 'Name is required' }} />
                <TextboxField name="chooseCondition.description"
                    label="Description" variant="outlined"
                    multiline
                    rows={4} />
                <FlexBox flexDirection="column">
                    <Typography variant="h6">Calculate SLA Evaluation (Resolution due) when conditions are met from</Typography>
                    <StyledRadioFields name="chooseCondition.slaEvalutaion" radioOptions={[{ key: '0', label: 'Ticket creation time' }, { key: '1', label: 'Time when conditions are met' }]} />
                </FlexBox>
                <Box
                    display="flex"
                    flexDirection='column'
                    gap={4}
                    p={2}
                    sx={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
                    <Typography variant="body2">Apply this SLA to the tickets that meet All of these conditions</Typography>
                    <Conditions ticketFieldDropdownData={ticketFieldDropdownData} priorities={props.priorities} />
                </Box>
            </FlexBox>
        </>
    )
}

const Conditions = (props: { ticketFieldDropdownData: IKeyValue[], priorities: IPriority[] }) => {

    return (
        <Box
            display="flex"
            gap={4}
            p={2}
            sx={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
            <SelectField name="chooseCondition.ticketFields" menuOptions={props.ticketFieldDropdownData} sx={{ width: '33%' }} label="Ticket Fields" />
            <SelectField name="chooseCondition.condition" menuOptions={[{ key: 'is', value: 'Is' }]} sx={{ width: '33%' }} />
            <ConditionValueContainer ticketFieldDropdownData={props.ticketFieldDropdownData} priorities={props.priorities} />
        </Box>
    )
}

const ConditionValueContainer = (props: { ticketFieldDropdownData: IKeyValue[], priorities: IPriority[] }) => {
    const { ticketFieldDropdownData, priorities } = props;
    const { watch } = useFormContext<IEscalationFormFields>();
    const ticketFieldValue = watch('chooseCondition.ticketFields');
    const isSourceSelected = ticketFieldDropdownData.find((item) => item.key === ticketFieldValue)?.value.toLocaleLowerCase() === 'source';
    const isPrioritySelected = ticketFieldDropdownData.find((item) => item.key === ticketFieldValue)?.value.toLocaleLowerCase() === 'priority';
    const isQueueSelected = ticketFieldDropdownData.find((item) => item.key === ticketFieldValue)?.value.toLocaleLowerCase() === 'queue';
    const isStutusSelected = ticketFieldDropdownData.find((item) => item.key === ticketFieldValue)?.value.toLocaleLowerCase() === 'status';

    const { data, isLoading } = useFetchAllStatuses(isStutusSelected);
    const { data: allSources, isLoading: isSourcesLoading } = useFetchAllChannels(isSourceSelected);
    const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues(isQueueSelected);

    const getMenuOptions = () => {
        if (isSourceSelected) {
            return allSources!.map((item) => ({ key: item.channel_id.toString(), value: item.name }))
        }
        else if (isPrioritySelected) {
            return priorities.map((item) => ({ key: item.id.toString(), value: item.name }))
        }
        else if (isQueueSelected) {
            return allQueues!.map((item) => ({ key: item.id.toString(), value: item.name }))
        }
        else if (isStutusSelected) {
            return data!.map((item) => ({ key: item.id.toString(), value: item.name }))
        }
        return [];
    }

    return (
        <>
            {isLoading || isSourcesLoading || isQueueLoading
                ? <CircularProgress />
                :
                <div style={{ width: '33%' }}>
                    <SelectField
                        name="chooseCondition.conditionValue"
                        label="Field Options"
                        rules={{ required: 'Please select an option' }}
                        menuOptions={getMenuOptions()} sx={{ width: '100%' }} />
                </div>
            }
        </>
    )
}
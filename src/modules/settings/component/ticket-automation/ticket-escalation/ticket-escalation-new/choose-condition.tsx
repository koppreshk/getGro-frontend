import styled, { useTheme } from "styled-components";
import { UseFieldArrayRemove, useFieldArray, useFormContext } from "react-hook-form";
import { FlexBox } from "lib/ui-ux";
import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material"
import { RadioGroupField, SelectField, TextboxField } from "lib/form-fields"
import { IEscalationsNew, IField, IPriority, useFetchAllQueues } from "modules/settings/apis/ticket-automation/escalations";
import { IEscalationFormFields } from "./add-escalation-layout";
import { useFetchAllChannels } from "modules/settings/apis/tags";
import { useFetchAllStatuses } from "modules/settings/apis/ticket-status";
import { useCallback } from "react";
import { DeleteOutline } from "@mui/icons-material";

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
    priorities: IPriority[];
    mode?: 'add' | 'edit';
    slaName?: string;
    allEscalations?: IEscalationsNew[];
}

export const ChooseCondition = (props: IChooseConditionProps) => {
    const { ticketField, allEscalations, mode, slaName } = props;
    const ticketFieldDropdownData = ticketField.map((data) => ({ key: data.id.toString(), value: data.name }))
    const { pallete, semantics } = useTheme();
    const validateEscalationName = (value: string) => {
        const modifiedData = mode === 'edit' ? allEscalations?.filter((item) => item.name !== slaName) : allEscalations;
        const doesNameExist = modifiedData?.some((item) => item.name === value);
        if (doesNameExist) {
            return `${value} already exists, please use a different name to continue`;
        }
    }
    const { fields, append, remove } = useFieldArray({
        name: 'conditionsArray'
    });

    const onAddCondition = useCallback(() => {
        append({ ticketFields: '', condition: '', conditionValue: '' })
    }, [append]);

    return (
        <>
            <FlexBox width="100%" flexDirection="column" gap="20px">
                <TextboxField name="chooseCondition.name" label="Name" variant="outlined" rules={{ required: 'Name is required', validate: validateEscalationName }} />
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
                    sx={{ border: `1px solid ${pallete.formFieldBorderColor}`, borderRadius: semantics.borderRadius.sm }}>
                    <Typography variant="body2">Apply this SLA to the tickets that meet All of these conditions</Typography>
                    {fields.map((field, index) => <Conditions key={field.id} fieldArrayName="conditionsArray" index={index} remove={remove} ticketFieldDropdownData={ticketFieldDropdownData} priorities={props.priorities} />)}
                    <Button variant="contained" size="small" sx={{ width: 'fit-content' }} onClick={onAddCondition}>Add Condition</Button>
                </Box>
            </FlexBox>
        </>
    )
}

const Conditions = (props: { index: number; fieldArrayName: string; ticketFieldDropdownData: IKeyValue[], priorities: IPriority[]; remove: UseFieldArrayRemove; }) => {
    const { index, fieldArrayName, priorities, ticketFieldDropdownData, remove } = props;
    const { pallete, semantics } = useTheme();

    return (
        <Box
            display="flex"
            gap={4}
            p={2}
            sx={{ border: `1px solid ${pallete.formFieldBorderColor}`, borderRadius: semantics.borderRadius.sm }}>
            <SelectField name={`${fieldArrayName}.${index}.ticketFields`} menuOptions={ticketFieldDropdownData} sx={{ width: '33%' }} label="Ticket Fields" />
            <SelectField name={`${fieldArrayName}.${index}.condition`} menuOptions={[{ key: 'is', value: 'Is' }]} sx={{ width: '33%' }} />
            <ConditionValueContainer ticketFieldDropdownData={ticketFieldDropdownData} priorities={priorities} fieldArrayName={fieldArrayName} index={index} />
            <IconButton onClick={() => remove(index)} sx={{ width: 'fit-content' }}>
                <DeleteOutline />
            </IconButton>
        </Box>
    )
}

const ConditionValueContainer = (props: { ticketFieldDropdownData: IKeyValue[], priorities: IPriority[]; index: number; fieldArrayName: string; }) => {
    const { ticketFieldDropdownData, priorities, fieldArrayName, index } = props;
    const { watch } = useFormContext<IEscalationFormFields>();
    const ticketFieldValue = watch(`conditionsArray.${index}.ticketFields`);
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
                        name={`${fieldArrayName}.${index}.conditionValue`}
                        label="Field Options"
                        rules={{ required: 'Please select an option' }}
                        menuOptions={getMenuOptions()} sx={{ width: '100%' }} />
                </div>
            }
        </>
    )
}
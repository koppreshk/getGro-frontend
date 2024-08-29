import { Chip, Typography } from "@mui/material"
import { TextboxField } from "lib/form-fields"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { TicketConditions } from "./ticket-conditions"
import { FetchFieldsAndConditions, IAllAssignments } from "modules/settings/apis/ticket-automation";

interface ChooseConditionFormProps {
    data: FetchFieldsAndConditions[],
    allAssignments?: IAllAssignments[];
    mode?: string;
    ruleName?: string
}

export const ChooseConditionForm = (props: ChooseConditionFormProps) => {
    const { data, allAssignments, mode, ruleName } = props;

    const validateRuleName = (value: string) => {
        const modifiedData = mode === 'edit' ? allAssignments?.filter((item) => item.name !== ruleName) : allAssignments;
        const doesNameExist = modifiedData?.some((item) => item.name === value);
        if (doesNameExist) {
            return `${value} already exists, please use a different name to continue`;
        }
    }

    return (
        <FlexBox flexDirection="column" gap={'20px'}>
            <FlexBox flexDirection="column" gap={'5px'}>
                <Typography variant="h6">Rule Name</Typography>
                <TextboxField name="ruleName" size="small" rules={{ required: 'Rule name is required', validate: validateRuleName }} placeholder="Enter text here..." />
            </FlexBox>
            <FlexBox flexDirection="column" gap={'5px'}>
                <Typography variant="h6">Description</Typography>
                <TextboxField
                    name="description"
                    variant="outlined"
                    placeholder="Enter text here..."
                    multiline
                    rows={4} />
            </FlexBox>
            <FlexBox flexDirection="column" alignItems="center" width="100%">
                <TicketConditions
                    fieldArrayName="allTicketConditions"
                    data={data}
                    heading={<Typography variant="body2">Apply this rule to the tickets that meet <b>All</b> of these conditions</Typography>} />
                <ConditionCombiner />
                <TicketConditions
                    fieldArrayName="anyTicketConditions"
                    data={data}
                    heading={<Typography variant="body2">Apply this rule to the tickets that meet <b>Any</b> of these conditions</Typography>} />
            </FlexBox>
        </FlexBox>
    )
}

const ConditionCombiner = () => {
    return (
        <>
            <VerticalSeparator />
            <Chip label="AND" />
            <VerticalSeparator />
        </>
    )
}
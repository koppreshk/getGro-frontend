import { Chip, Typography } from "@mui/material"
import { TextboxField } from "lib/form-fields"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { TicketConditions } from "./ticket-conditions"
import { FetchFieldsAndConditions } from "modules/settings/apis/ticket-automation";

export const ChooseConditionForm = (props: { data: FetchFieldsAndConditions[] }) => {
    const { data } = props;

    return (
        <FlexBox flexDirection="column" gap={'20px'}>
            <FlexBox flexDirection="column" gap={'5px'}>
                <Typography variant="h6">Rule Name</Typography>
                <TextboxField name="ruleName" size="small" rules={{ required: 'Rule name is required' }} placeholder="Enter text here..." />
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
import { Typography } from "@mui/material"
import { TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"

export const ChooseConditionForm = () => {
    return (
        <FlexBox width="60%" flexDirection="column" gap={'20px'}>
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
        </FlexBox>
    )
}
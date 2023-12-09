import { Button, FormControlLabel, Typography } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { CheckboxField } from "lib/form-fields/checkbox-field";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"

const menuOptions = [{
    key: 'pending-from-tech',
    value: 'Pending from Tech'
}, {
    key: 'pending-from-finance',
    value: 'Pending from Finance'
}, {
    key: 'resolved',
    value: 'Rssolved'
}, {
    key: 'in-progress',
    value: 'In Progress'
}, {
    key: 'pending',
    value: 'Pending'
}, {
    key: 'on-hold',
    value: 'On Hold'
}, {
    key: 'pending-from-internal-team',
    value: 'Pending From Internal Team'
}, {
    key: 'closed',
    value: 'Closed'
}]

export const TicketDispose = () => {
    const formValues = useForm();

    return (
        <FormProvider {...formValues}>
            <FlexBox $padding="10px" $flexDirection="column">
                <Typography fontWeight="500">Ticket Dispose</Typography>
                <HorizontalSeparator $margin="10px 0px" />
                <FlexBox $alignItems="center" $justifyContent="center" $flexDirection="column" $gap="40px" $padding="40px 0px">
                    <FlexBox $flexDirection="column" $gap="10px">
                        <TextboxField name="remarks" label="Remarks" sx={{ width: '350px' }} />
                        <SelectField name="disposition-type" label="Disposition Type" menuOptions={menuOptions} sx={{ width: '350px' }} />
                        <FormControlLabel control={<CheckboxField name="callback" sx={{ width: '40px' }} />} label="is callback required?" />
                    </FlexBox>
                    <Button variant="contained" sx={{ width: '350px' }}>
                        Done
                    </Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}
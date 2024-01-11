import { Button, FormControlLabel, Typography } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { CheckboxField } from "lib/form-fields/checkbox-field";
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import { HeaderWrapper } from "../../ticket-list-view";
import styled from "styled-components";
import { TicketDisposeFolder } from ".";

const StyledFlexbox = styled(HeaderWrapper)`
    min-height: 72px;
`;

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
            <FlexBox $flexDirection="column">
                <StyledFlexbox $alignItems="center">
                    <Typography fontWeight="500">Dispose Ticket</Typography>
                </StyledFlexbox>
                <FlexBox $flexDirection="column" $padding="15px">
                    <TicketDisposeFolder />
                    <FlexBox $flexDirection="column" $gap="40px" $padding="40px 0px">
                        <FlexBox $flexDirection="column" $gap="10px">
                            <TextboxField name="remarks" label="Remarks" />
                            <SelectField name="disposition-type" label="Disposition Type" menuOptions={menuOptions}  />
                            <FormControlLabel control={<CheckboxField name="callback" sx={{ width: '40px' }} />} label="is callback required?" />
                        </FlexBox>
                        <Button variant="contained">
                            Done
                        </Button>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}
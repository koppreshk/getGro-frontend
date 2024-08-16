import { Button, Typography } from "@mui/material"
import { CheckboxField, RadioGroupField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components"

const StyledFooter = styled(FlexBox)`
    border-top:  ${({ theme }) => theme.semantics.standardBorder};
`;

const StyledRadioFields = styled(RadioGroupField)`
    .MuiFormControlLabel-label {
        font-size: 14px;
    }
`;

interface IMergeTicketsFormFields {
    addSecondaryTicketMessage: "first_message" | "last_message";
    closeSecondaryTicket: boolean;
    addSecondaryLinkInPrimary: boolean
    sendMail: boolean;
}

interface IMergeTicketsContentProps {
    submitMergeTicketHandler: () => void;
}

export const MergeTicketsContent = (props: IMergeTicketsContentProps) => {
    const { submitMergeTicketHandler } = props;
    const methods = useForm<IMergeTicketsFormFields>({
        defaultValues: {
            addSecondaryTicketMessage: "last_message",
            addSecondaryLinkInPrimary: true,
            closeSecondaryTicket: true
        }
    })

    return (
        <FormProvider {...methods}>
            <FlexBox flexDirection="column" justifyContent="space-between" height="calc(100% - 77px)">
                <FlexBox>
                    {/* search tickets content */}
                </FlexBox>

                <StyledFooter padding="20px" width="100%" gap="12px" flexDirection="column">
                    <AdditionalOptions />
                    <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                        <Button variant="outlined" >Cancel</Button>
                        <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(submitMergeTicketHandler)}>Merge Tickets</Button>
                    </FlexBox>
                </StyledFooter>
            </FlexBox>
        </FormProvider>
    )
}

const AdditionalOptions = () => {
    return (
        <FlexBox flexDirection="column">

            <FlexBox alignItems="center" >
                <CheckboxField name="addSecondaryLinkInPrimary" />
                <Typography variant="body2">Add a secondary ticket link to the primary ticket.</Typography>
            </FlexBox>
            <FlexBox alignItems="center">
                <CheckboxField name="closeSecondaryTicket" />
                <Typography variant="body2">After the merge, close all secondary tickets.</Typography>
            </FlexBox>
            <FlexBox alignItems="center">
                <CheckboxField name="sendMail" />
                <Typography variant="body2">Don't send an email notification to customer</Typography>
            </FlexBox>
            <FlexBox flexDirection="column" style={{ marginLeft: '14px' }}>
                <Typography variant="h6">Add Secondary Ticket:</Typography>
                <StyledRadioFields name="addSecondaryTicketMessage" radioOptions={[{ key: 'first_message', label: 'First Message' }, { key: 'last_message', label: 'Last Message' }]} />
            </FlexBox>

        </FlexBox>
    )
}
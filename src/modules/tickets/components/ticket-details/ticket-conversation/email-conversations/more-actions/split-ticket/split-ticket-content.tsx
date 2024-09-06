import { Button, Grid, Typography } from "@mui/material";
import { CheckboxField, RadioGroupField, TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox, HorizontalSeparator, LoadingButton } from "lib/ui-ux";
import { useForm, FormProvider } from "react-hook-form";
import { SplitTicketProps } from "./split-ticket";
import { StyledRichTextEditor } from "modules/settings/component/ticket-configurations/templates/add-templates-form";
import { QueueOptions } from "./queue-options";
import styled from "styled-components";

interface ISplitTicketsContentProps extends Omit<SplitTicketProps, 'showSplitTicketDrawer'> {
    mutationLoading: boolean;
    onSubmit: (formData: ISplitTicketsFormFields) => void
}

export interface ISplitTicketsFormFields {
    subject: string;
    description: string;
    assignee: 'auto' | 'manual';
    queueId: string;
    employeeId: string;
    associationWithTicket: 'link_ticket';
    copyAttachments: boolean;
}

const StyledRadioGroupFields = styled(RadioGroupField)`
    .MuiRadio-sizeSmall {
        padding: 6px 9px;
    }
`;

export const SplitTicketsContent = (props: ISplitTicketsContentProps) => {
    const { mutationLoading, emailProps, onCloseDrawer, onSubmit } = props;
    const { subject, htmlContent } = emailProps;
    const methods = useForm<ISplitTicketsFormFields>({
        defaultValues: {
            subject,
            description: htmlContent,
            assignee: 'auto',
            associationWithTicket: 'link_ticket',
            copyAttachments: false,
        },
        mode: 'onBlur'
    })

    return (
        <FormProvider {...methods}>
            <FlexBox flexDirection="column" width="100%" padding="20px" gap={'20px'} overflowY="auto">
                <TextboxFieldWithLabel name="subject" label="Subject" />
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: '5px' }}>Description</Typography>
                    <StyledRichTextEditor name={`description`} disableAutoFocus />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: '5px' }}>Assignee</Typography>
                    <StyledRadioGroupFields
                        name="assignee"
                        row={false}
                        sx={{ width: '100%' }}
                        radioOptions={[
                            { key: 'auto', label: 'Auto assign' },
                            { key: 'manual', label: 'Select agent', renderContentBelowLabel: () => methods.watch('assignee') === 'manual' ? <QueueOptions /> : null }
                        ]} />
                </Grid>
                <HorizontalSeparator />
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: '5px' }}>Association with current ticket</Typography>
                    <StyledRadioGroupFields
                        name="associationWithTicket"
                        row={false}
                        sx={{ width: '100%' }}
                        radioOptions={[
                            { key: 'no_association', label: 'No Association' },
                            { key: 'child_ticket', label: 'Child Ticket' },
                            { key: 'link_ticket', label: 'Related Ticket' }
                        ]} />
                </Grid>
                <HorizontalSeparator />
                <FlexBox alignItems="center" >
                    <CheckboxField name="copyAttachments" sx={{ padding: '0 9px 0px 0px' }} />
                    <Typography variant="body2">Copy attachment from current update to new ticket</Typography>
                </FlexBox>
            </FlexBox>
            <FlexBox padding="20px" gap='10px' width="100%" justifyContent="flex-end">
                <Button variant="outlined" onClick={onCloseDrawer}>Cancel</Button>
                <LoadingButton isLoading={mutationLoading} variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>Split Tickets</LoadingButton>
            </FlexBox>
        </FormProvider>
    )
}
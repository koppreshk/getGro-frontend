import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { SelectField, TagInputField, TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox, LoadingButton } from "lib/ui-ux";
import { IPriorities } from "modules/tickets/apis";
import { StyledRichTextEditor } from "modules/settings/component/ticket-configurations/templates/add-templates-form";
import { ITag } from "modules/settings/apis/tags";
import { StyledRadioGroupFields } from "../../ticket-conversation/email-conversations/more-actions/split-ticket";
import { QueueOptions } from "../../ticket-conversation/email-conversations/more-actions/split-ticket/queue-options";

interface IAddTicketFormProps {
    priorities: IPriorities[];
    allTags: ITag[];
    toggleAddTicketDrawer: () => void;
}

const StyledTags = styled(TagInputField)`
    padding: 16.5px 14px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
    border: 1px solid ${({ theme }) => theme.pallete.formFieldBorderColor};
    width: 100%;
    &:hover {
        border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
    };
`;

export interface IAddTIcketFormFields {
    requesterEmail: string;
    subject: string;
    priority: string,
    template: string;
    assignee: string;
    queueId: string;
    employeeId: string;
    tags: string[],
}

export const AddTicketForm = (props: IAddTicketFormProps) => {
    const { priorities, allTags, toggleAddTicketDrawer } = props;
    const formMethods = useForm<IAddTIcketFormFields>({
        defaultValues: {
            priority: '1',
            requesterEmail: '',
            subject: '',
            template: '',
            assignee: 'auto',
            employeeId: '',
            queueId: '',
            tags: []
        }
    });
    // const { mutateAsync } = useCreateManualTicket();
    // const { showNotification } = useNotifications();

    const onSubmit = (formData: IAddTIcketFormFields) => {
        console.log(formData)
        // mutateAsync({
        //     channel_id: formData.channel,
        //     employee_id: formData.employeeId,
        //     priority_id: formData.priority,
        //     queue_id: formData.queueId,
        //     remarks: formData.remarks,
        //     tag_id: formData.tag.map((item) => (item.key)),
        //     title: formData.title
        // })
        //     .then(() => showNotification({ message: 'Created a new ticket successfully', type: 'success' }))
        //     .catch(() => showNotification({ message: 'Failed to create a new ticket', type: 'error' }))
        //     .finally(() => toggleAddTicketDrawer())
    }

    return (
        <FormProvider {...formMethods}>
            <FlexBox flexDirection="column" width="100%" padding="20px" justifyContent="space-between" height="calc(100% - 78px)" gap={'20px'}>
                <FlexBox gap="20px" flexDirection="column" overflowY="auto" maxHeight="calc(100% - 57px)" padding="0 10px 0px 0px">
                    <TextboxFieldWithLabel name="requesterEmail" type="email" label="Requester Email" />
                    <TextboxFieldWithLabel name="subject" label="Subject" />
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Priority</Typography>
                        <SelectField name="priority" sx={{ width: '100%' }} menuOptions={priorities.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Description</Typography>
                        <StyledRichTextEditor name={`template`} disableAutoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Assignee</Typography>
                        <StyledRadioGroupFields
                            name="assignee"
                            row={false}
                            sx={{ width: '100%' }}
                            radioOptions={[
                                { key: 'auto', label: 'Auto assign' },
                                { key: 'manual', label: 'Select agent', renderContentBelowLabel: () => formMethods.watch('assignee') === 'manual' ? <QueueOptions /> : null }
                            ]} />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h6" sx={{ mb: '5px' }}>Tags</Typography>
                        <StyledTags
                            gap={"15px"}
                            name="tags"
                            allowToAddTagsViaText={false}
                            allowSuggestions
                            suggestedTags={allTags.map((item) => item.name)} />
                    </Grid>
                </FlexBox>
                <FlexBox justifyContent="flex-end" gap={'20px'} padding="0 30px 0 0">
                    <Button variant="outlined" onClick={toggleAddTicketDrawer}>Cancel</Button>
                    <LoadingButton isLoading={false} variant="contained" onClick={formMethods.handleSubmit(onSubmit)}>Submit</LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}

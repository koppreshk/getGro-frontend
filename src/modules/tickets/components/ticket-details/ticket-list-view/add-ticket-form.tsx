import { useFormContext } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { SelectField, TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { GetEmployeesByQueueContainer } from "modules/tickets/containers";
import { Queue } from "modules/settings/apis";
import { IAddTIcketFormFields } from "./add-ticket";
import { IPriorities, useCreateManualTicket } from "modules/tickets/apis";
import { useNotifications } from "lib";
import { StyledRichTextEditor } from "modules/settings/component/ticket-configurations/templates/add-templates-form";
import { StyledTags } from "../ticket-details-section/ticket-overview";
import { useState, useCallback } from "react";
import { ITag } from "modules/settings/apis/tags";

interface IAddTicketFormProps {
    queueData: Queue[];
    priorities: IPriorities[];
    allTags: ITag[];
    toggleAddTicketDrawer: () => void;
}

export const AddTicketForm = (props: IAddTicketFormProps) => {
    const { queueData, priorities, allTags, toggleAddTicketDrawer } = props;
    const { watch, handleSubmit } = useFormContext<IAddTIcketFormFields>();
    const { mutateAsync } = useCreateManualTicket();
    const { showNotification } = useNotifications();
    const [tagItems, setTagItems] = useState<string[]>([]);

    const onTagInputChange = useCallback((items: string[]) => {
        setTagItems(items)
    }, []);

    const onSubmit = (formData: IAddTIcketFormFields) => {
        mutateAsync({
            channel_id: formData.channel,
            employee_id: formData.employeeId,
            priority_id: formData.priority,
            queue_id: formData.queueId,
            remarks: formData.remarks,
            tag_id: formData.tag.map((item) => (item.key)),
            title: formData.title
        })
            .then(() => showNotification({ message: 'Created a new ticket successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to create a new ticket', type: 'error' }))
            .finally(() => toggleAddTicketDrawer())
    }

    return (
        <FlexBox flexDirection="column" width="100%" padding="20px" justifyContent="space-between" height="calc(100% - 78px)" gap={'20px'}>
            <FlexBox gap="20px" flexDirection="column" overflowY="auto" maxHeight="calc(100% - 57px)" padding="0 10px 0px 0px">
                <TextboxFieldWithLabel name="subject" label="Subject" />
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: '5px' }}>Priority</Typography>
                    <SelectField name="priority" sx={{ width: '100%' }} menuOptions={priorities.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: '5px' }}>Description</Typography>
                    <StyledRichTextEditor name={`template`} />
                </Grid>
                <Grid item xs={12} direction={'row'}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Select Queue</Typography>
                        <SelectField
                            name="queueId" sx={{ width: '100%' }}
                            menuOptions={queueData?.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                    </Grid>
                    <Grid item xs={6}>
                        {watch('queueId') ? <GetEmployeesByQueueContainer queueId={watch('queueId')!.toString()} /> : null}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Tags</Typography>
                    <StyledTags
                        tagInputs={tagItems}
                        gap={"15px"}
                        allowToAddTagsViaText={false}
                        allowSuggestions
                        suggestedTags={allTags.map((item) => item.name)}
                        onTagInputChange={onTagInputChange} />
                </Grid>
            </FlexBox>
            <FlexBox justifyContent="flex-end" gap={'20px'} padding="0 30px 0 0">
                <Button variant="outlined" onClick={toggleAddTicketDrawer}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
            </FlexBox>
        </FlexBox>
    )
}

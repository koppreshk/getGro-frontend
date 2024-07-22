import { useFormContext } from "react-hook-form";
import { Grid, Button, CircularProgress } from "@mui/material";
import { TextboxField, SelectField, AutocompleteField } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { IChannels, useFetchTagsByChannel } from "modules/settings/apis/tags";
import { GetEmployeesByQueueContainer } from "modules/tickets/containers";
import { Queue } from "modules/settings/apis";
import { IAddTIcketFormFields } from "./add-ticket";
import { IPriorities, useCreateManualTicket } from "modules/tickets/apis";
import { useNotifications } from "lib";
import { useSourceIcon } from "modules/tickets/hooks";

interface IAddTicketFormProps {
    queueData: Queue[];
    priorities: IPriorities[]
    channelData: IChannels[];
    toggleAddTicketDrawer: () => void;
}

export const AddTicketForm = (props: IAddTicketFormProps) => {
    const { queueData, channelData, priorities, toggleAddTicketDrawer } = props;
    const getSourceIcon = useSourceIcon();
    const { watch, handleSubmit } = useFormContext<IAddTIcketFormFields>();
    const { mutateAsync } = useCreateManualTicket();
    const { showNotification } = useNotifications();

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
        <FlexBox flexDirection="column" width="100%" padding="20px" justifyContent="space-between" height="calc(100% - 77px)">
            <FlexBox gap="15px" flexDirection="column" overflowY="auto" maxHeight="calc(100% - 45px)">
                <FlexBox width="100%" gap="10px">
                    <TextboxField name="title" label="Title" sx={{ width: 'calc(50% - 10px)' }} />
                    <SelectField name="priority" label="Priority" sx={{ width: '50%' }} menuOptions={priorities.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                </FlexBox>
                <TextboxField
                    name="remarks" label="Remarks"
                    placeholder="Enter your remarks here..."
                    multiline
                    rows={4}
                />
                <HorizontalSeparator $margin="8px 0px" />
                <FlexBox flexDirection="column" gap="15px">
                    <SelectField sx={{ width: '100%' }} name="channel" label="Channel" menuOptions={channelData?.map((item) => ({
                        key: item?.channel_id.toString(),
                        value: item.name,
                        iconComponent: getSourceIcon(item.name, { marginRight: '10px' })
                    }))} />
                    {watch('channel') ?
                        (
                            <>
                                <TagsByChannelIdContainer channelId={watch('channel')} />
                                <HorizontalSeparator $margin="8px 0px" />
                            </>
                        ) : null}
                </FlexBox>
                <Grid item xs={12}>
                    <SelectField name="queueId" label="Select Queue" sx={{ width: '100%' }}
                        menuOptions={queueData?.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                </Grid>
                {watch('queueId') ? <GetEmployeesByQueueContainer queueId={watch('queueId')!.toString()} /> : null}
            </FlexBox>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
        </FlexBox>
    )
}

const TagsByChannelIdContainer = (props: { channelId: string }) => {
    const { data, isLoading } = useFetchTagsByChannel(props.channelId.toString());

    if (isLoading) {
        return (
            <FlexBox justifyContent="center">
                <CircularProgress />
            </FlexBox>
        )
    }

    return (
        <AutocompleteField name="tag" label="Select Tags" options={data?.map((item) => ({ key: item?.tag_id?.toString(), value: item?.tag }))} placeholder="Select Tags" />
    )

} 
import { useFormContext } from "react-hook-form";
import { Grid, Button, CircularProgress } from "@mui/material";
import { TextboxField, SelectField, AutocompleteField } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { IChannels, useFetchTagsByChannel } from "modules/settings/apis/tags";
import { GetEmployeesByQueueContainer } from "modules/tickets/containers";
import { Queue } from "modules/settings/apis";
import { IAddTIcketFormFields } from "./add-ticket";
import { useSourceIcon } from "../../display-tickets-grid";

interface IAddTicketFormProps {
    queueData: Queue[];
    channelData: IChannels[];
}

export const AddTicketForm = (props: IAddTicketFormProps) => {
    const { queueData, channelData } = props;
    const getSourceIcon = useSourceIcon();
    const { watch } = useFormContext<IAddTIcketFormFields>();

    return (
        <FlexBox flexDirection="column" width="100%" gap="15px" padding="20px" overflowY="auto">
            <FlexBox width="100%" gap="10px">
                <TextboxField name="title" label="Title" sx={{ width: 'calc(50% - 10px)' }} />
                <SelectField name="priority" label="Priority" sx={{ width: '50%' }} menuOptions={[{ key: 'low', value: 'Low' }, { key: 'medium', value: 'Medium' }, { key: 'high', value: 'High' }]} />
            </FlexBox>
            <TextboxField
                name="remarks" label="Remarks"
                placeholder="Enter your remarks here..."
                multiline
                rows={4}
                maxRows={4}
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
            <Button variant="contained">Submit</Button>
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
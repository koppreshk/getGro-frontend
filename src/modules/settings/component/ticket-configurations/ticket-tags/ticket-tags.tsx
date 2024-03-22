import { useCallback } from "react"
import { FlexBox, TagInput } from "lib/ui-ux"
import { ITag, useCreateTagByChannelId, useDeleteTag } from "modules/settings/apis/tags";
import { useNotifications } from "lib";

interface ITicketTagsProps {
    data: ITag[];
    channelId: number;
}

export const TicketTags = (props: ITicketTagsProps) => {
    const { data, channelId } = props;
    const { mutateAsync } = useDeleteTag();
    const { mutateAsync: createTag } = useCreateTagByChannelId();
    const { showNotification } = useNotifications();

    const onTagInputChange = useCallback((_items: string[], item: string, reason: 'ON_ENTER_KEY' | 'ON_DELETE') => {
        if (reason === 'ON_DELETE') {
            const id = data.find(tagItem => tagItem.tag === item)?.tag_id
            mutateAsync({ id: id?.toString() || '' })
                .then(() => showNotification({ message: `${item} deleted successfully` }))
                .catch(() => showNotification({ message: 'Failed to delete', type: 'error' }));
            return;
        }
        createTag({
            channelId: channelId,
            name: item
        })
    }, [channelId, createTag, data, mutateAsync, showNotification]);

    return (
        <FlexBox width="70%">
            <TagInput tagInputs={data.map((item) => item.tag)} onTagInputChange={onTagInputChange} placeholder="Add your tags here..." />
        </FlexBox>
    )
}

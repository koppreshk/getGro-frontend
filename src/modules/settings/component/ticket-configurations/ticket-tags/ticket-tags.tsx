import { useCallback, useEffect, useState } from "react"
import { FlexBox, TagInput } from "lib/ui-ux"
import { ITag, useCreateTagByChannelId, useDeleteTag } from "modules/settings/apis/tags";
import { useNotifications } from "lib";
import { EditTag } from "./edit-tag";

interface ITicketTagsProps {
    data: ITag[];
    channelId: number;
}

export const TicketTags = (props: ITicketTagsProps) => {
    const { data, channelId } = props;
    const { mutateAsync } = useDeleteTag();
    const { mutateAsync: createTag } = useCreateTagByChannelId();
    const { showNotification } = useNotifications();

    const [tags, setTags] = useState(data.map((item) => item.tag));
    const [open, setOpen] = useState(false);
    const [clickedTagDetails, setClickedTagDetails] = useState<{ name: string; id: number; }>({ id: 0, name: '' });

    useEffect(() => {
        if (data) {
            setTags(data.map((item) => item.tag));
        }
    }, [data]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onTagClick = (item: string) => {
        handleClickOpen();
        const id = data.find(tagItem => tagItem.tag === item)?.tag_id
        setClickedTagDetails({ name: item, id: id! });
    }

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
            <TagInput
                tagInputs={tags}
                gap={"15px"}
                placeholder="Add your tags here..."
                onTagClick={onTagClick}
                onTagInputChange={onTagInputChange} />
            <EditTag clickedTagDetails={clickedTagDetails} handleClose={handleClose} open={open} />
        </FlexBox>
    )
}

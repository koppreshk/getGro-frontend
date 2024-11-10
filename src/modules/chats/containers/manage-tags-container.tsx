import { CircularProgress } from "@mui/material";
import { FlexBox, ManageTags } from "lib/ui-ux";
import { useFetchAllChatTags, useUpdateChatTags } from "../apis";
import { useAppSelector } from "lib/hooks";

export const ManageTagsContainer = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails)
    const { data: allTags, isLoading: tagsLoading } = useFetchAllChatTags();
    const { mutateAsync } = useUpdateChatTags();

    const onTagsChange = (tag_ids: number[]) => {
        return mutateAsync({
            tag_ids,
            conversation_id: chatDetails!.id
        })
    }

    if (tagsLoading) {
        return <FlexBox width="100%" justifyContent="center"><CircularProgress size={32} /></FlexBox>
    }

    if (allTags) {
        const associatedTags = allTags.filter((item) => chatDetails!.tags.includes(item.id))

        return (
            <>
                <ManageTags associatedTags={associatedTags} allTags={allTags} onTagsChange={onTagsChange} />
            </>
        )
    }
    return null

}
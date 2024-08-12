import { CircularProgress } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useFetchAllTags } from "modules/settings/apis/tags";
import { ITicketDetails, useUpdateTags } from "modules/tickets/apis";
import { ManageTags } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview";

interface IManageTagsContainerProps extends Pick<ITicketDetails, 'ticketId' | 'tags'> {

}

export const ManageTagsContainer = (props: IManageTagsContainerProps) => {
    const { ticketId, tags } = props;
    const { data: allTags, isLoading: tagsLoading } = useFetchAllTags();
    const { mutateAsync } = useUpdateTags();

    const onTagsChange = (tags: number[]) => {
        return mutateAsync({
            tags,
            ticketId: ticketId
        })
    }

    if (tagsLoading) {
        return <FlexBox width="100%" justifyContent="center"><CircularProgress size={32} /></FlexBox>
    }

    if (allTags) {
        const associatedTags = allTags.filter((item) => tags.includes(item.id))

        return (
            <>
                <ManageTags associatedTags={associatedTags} allTags={allTags} onTagsChange={onTagsChange} />
            </>
        )
    }
    return null

}
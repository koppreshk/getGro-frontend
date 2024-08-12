import { CircularProgress } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useFetchTagsById } from "modules/settings/apis/tags";
import { ITicketDetails, useUpdateTags } from "modules/tickets/apis";
import { ManageTags } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview";

interface IManageTagsContainerProps extends Pick<ITicketDetails, 'ticketId' | 'tags'> {

}

export const ManageTagsContainer = (props: IManageTagsContainerProps) => {
    const { ticketId, tags } = props;
    const { data, isLoading } = useFetchTagsById(tags[0]);
    const { mutateAsync } = useUpdateTags();

    const onTagsChange = (tags: number[]) => {
        return mutateAsync({
            tags,
            ticketId: ticketId
        })
    }

    if (isLoading) {
        return <FlexBox width="100%" justifyContent="center"><CircularProgress size={32} /></FlexBox>
    }

    return (
        <>
            <ManageTags associatedTags={data!} onTagsChange={onTagsChange} />
        </>
    )
}
import { CircularProgress } from "@mui/material";
import { FlexBox, ManagePriority } from "lib/ui-ux";
import { useFetchAllChatPriorities } from "../apis";
import { useUpdateChatPriority } from "../apis/update-chat-priority";
import { useAppSelector } from "lib/hooks";

export const ManagePriorityContainer = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails)
    const { data, isLoading } = useFetchAllChatPriorities();
    const { mutateAsync } = useUpdateChatPriority();

    const onChangePriority = (newPriority: number) => {
        return mutateAsync({
            priorityId: newPriority,
            conversationId: chatDetails!.id
        })
    }

    if (isLoading) {
        return <FlexBox width="100%" justifyContent="center"><CircularProgress size={32} /></FlexBox>
    }

    return (
        <>
            <ManagePriority allPriorities={data!} priorityId={chatDetails?.priority_id.toString() ?? ''} onChangePriority={onChangePriority} />
        </>
    )
}
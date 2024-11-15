import { CircularProgress } from "@mui/material";
import { FlexBox, ManageAssignee } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { IChangeAsigneeArgs } from "modules/tickets/apis";
import { useUpdateChatAssignee } from "../apis";
import { useAppSelector } from "lib/hooks";

export const ManageAssigneeContainer = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails)
    const { data, isLoading } = useFetchAllTicketQueues();
    const { mutateAsync } = useUpdateChatAssignee(chatDetails!.id);

    const onChangeAssignee = (args: IChangeAsigneeArgs) => {
        return mutateAsync(args);
    }

    if (isLoading) {
        return <FlexBox width="100%" justifyContent="center"><CircularProgress size={32} /></FlexBox>
    }

    return (
        <>
            <ManageAssignee data={data!} assignedTo={chatDetails?.assigned_to} onChangeAssignee={onChangeAssignee} />
        </>
    )
}
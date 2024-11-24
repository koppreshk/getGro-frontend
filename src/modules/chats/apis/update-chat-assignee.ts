import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ChatQueryKeys, ChatEndPoint } from "./api-enums";

export interface IChangeAsigneeArgs {
    queueId: string;
    agent?: string;
}

export const useUpdateChatAssignee = (conversationId: string | number) => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const changeAsignee = useCallback((args: IChangeAsigneeArgs) => {
        const agentValue = args?.agent ? `&assigned_to=${args.agent}` : '';
        return postData(`${ChatEndPoint.UPDATE_CHAT_ASSIGNEE}?conversation_id=${conversationId}&queue_id=${args.queueId}${agentValue}`).then((res) => res.json());
    }, [conversationId, postData]);

    return useMutation({
        mutationKey: [ChatQueryKeys.UPDATE_CHAT_ASSIGNEE],
        mutationFn: changeAsignee,
        onSuccess: () => {
            queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
        }
    });
}
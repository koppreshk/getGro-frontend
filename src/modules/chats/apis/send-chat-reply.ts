import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib"
import { ChatEndPoint, ChatQueryKeys } from ".";

interface ISendChatReplyArgs {
    conversation_id: string | number
    message_type: 'text' | 'video' | 'audio' | 'document';
    message: string
    chat_type: string
    media_url?: string
    caption?: string
    filename?: string
    mime_type?: string
}

export const useSendChatReply = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const sendChatReply = useCallback((args: ISendChatReplyArgs) => postData(ChatEndPoint.SEND_REPLY, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [ChatQueryKeys.SEND_REPLY],
        mutationFn: sendChatReply,
        onSuccess: () => {
            queryClient.invalidateQueries(ChatQueryKeys.FETCH_CONVERSATION_BY_ID);
        }
    });
}
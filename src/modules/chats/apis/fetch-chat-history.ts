import { useServiceClient } from "lib"
import React from "react";
import { ChatEndPoint, ChatQueryKeys } from "./api-enums";
import { useQuery } from "react-query";

interface ChatHistoryResponse {
    created_at: string;
    history: string;
    user: string;
}

export const useFetchChatHistory = (conversationId: string) => {
    const { getData } = useServiceClient();

    const fetchChatHistory = React.useCallback(() => getData(`${ChatEndPoint.FETCH_CHAT_HISTORY}?conversation_id=${conversationId}`).then((res) => res.json()), [conversationId, getData])

    return useQuery<ChatHistoryResponse[]>({
        queryKey: ChatQueryKeys.FETCH_CHAT_HISTORY,
        queryFn: fetchChatHistory,
    })
}
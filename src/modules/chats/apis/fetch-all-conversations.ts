import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ChatEndPoint, ChatQueryKeys } from "./api-enums";

export interface AllChatConversations {
    page: number
    conversations: ChatConversation[]
    total_pages: number
}

export interface ChatConversation {
    id: number
    customer_name: string
    created_at: string
    last_message: {
        message_type: string;
        message: string;
        direction: string;
    }
    chat_source: string
}

export const useFetchAllConversations = () => {
    const { getData } = useServiceClient();

    const fetchAllDashboardData = React.useCallback(() => getData(`${ChatEndPoint.FETCH_ALL_CONVERSATIONS}`).then((res) => res.json()), [getData])

    return useQuery<AllChatConversations>({
        queryKey: [ChatQueryKeys.FETCH_ALL_CONVERSATIONS],
        queryFn: fetchAllDashboardData
    });
}
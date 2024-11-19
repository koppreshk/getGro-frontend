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
    assigned_to: number
    chat_source: string;
    chat_type: string;
    created_at: string
    customer_name: string
    id: number
    is_conversation_closed: boolean;
    last_message: LastMessage;
    linked_tickets: LinkedTicket[];
    priority_id: number
    queue_id: number
    status_id: number
    tags: number[]
    post_url: string | null
}

export interface LastMessage {
    message_type: string
    message: string
    direction: string
}

export interface LinkedTicket {
    id: number
    status: string
    description: string
}


export const useFetchAllConversations = () => {
    const { getData } = useServiceClient();

    const fetchAllDashboardData = React.useCallback(() => getData(`${ChatEndPoint.FETCH_ALL_CONVERSATIONS}`).then((res) => res.json()), [getData])

    return useQuery<AllChatConversations, { message: string }>({
        queryKey: [ChatQueryKeys.FETCH_ALL_CONVERSATIONS],
        queryFn: fetchAllDashboardData
    });
}
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
    last_message: LastMessage;
    chat_source: string;
    status_id: number
    priority_id: number
    tags: number[]
    assigned_to: number
    queue_id: number
    linked_tickets: LinkedTicket[];
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
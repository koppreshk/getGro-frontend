/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ChatEndPoint, ChatQueryKeys } from "./api-enums";

export interface ChatConversationById {
    id: number
    is_expired: boolean
    profile_name: string
    profile_number: string
    messages: Message[];
    tags: any[]
    linked_tickets: any[]
    status_id: number
    priority_id: number
    assigned_to: number
    queue_id: number
}

export type MessageType = 'image' | 'text' | 'video' | 'audio' | 'document';

export interface Message {
    message_type: MessageType;
    message?: string
    direction: string
    status: string
    created_at: string
    replied_by: string
    caption: null | string;
    media_url?: string;
    mime_type?: string;
}

export const useFetchConversationById = (id?: string) => {
    const { getData } = useServiceClient();

    const fetchAllDashboardData = React.useCallback(() => getData(`${ChatEndPoint.FETCH_CONVERSATION_BY_ID}?conversation_id=${id}`).then((res) => res.json()), [getData, id])

    return useQuery<ChatConversationById, { message: string }>({
        queryKey: [ChatQueryKeys.FETCH_CONVERSATION_BY_ID, id],
        queryFn: fetchAllDashboardData,
        enabled: !!id
    });
}
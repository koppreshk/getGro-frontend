import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib"
import { ChatEndPoint, ChatQueryKeys } from ".";

interface ILinkTicketArgs {
    conversation_id: number
    ticket_ids: number[];
}

interface IUnLinkTicketArgs {
    conversation_id: number
    ticket_id: number;
}

export const useLinkTicket = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const linkTicket = useCallback((args: ILinkTicketArgs) => postData(ChatEndPoint.LINK_TICKET, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [ChatQueryKeys.LINK_TICKET],
        mutationFn: linkTicket,
        onSuccess: () => {
            queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
        }
    });
}


export const useUnLinkTicket = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const linkTicket = useCallback((args: IUnLinkTicketArgs) => postData(ChatEndPoint.UNLINK_TICKET, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [ChatQueryKeys.UNLINK_TICKET],
        mutationFn: linkTicket,
        onSuccess: () => {
            queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
        }
    });
}
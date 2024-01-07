import { useNotifications, useServiceClient } from "lib"
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export const useReplyToEmail = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    const { showNotification } = useNotifications();

    const replyToEmail = React.useCallback((args: { messageId: string, htmlContent: string }) => {
        return postData(`${TicketsEndPoint.REPLY_TO_EMAIL}?body=${args.htmlContent}&message_id=${args.messageId}`)
            .then((res) => res.json())
            .catch(() => {
                showNotification({ message: 'Failed to send a reply, try again later', type: 'error' })
            })
    }, [postData, showNotification]);

    return useMutation({
        mutationFn: replyToEmail,
        mutationKey: [TicketsQueryKey.REPLY_TO_EMAIL],
        onSuccess: () => {
            queryClient.invalidateQueries(TicketsQueryKey.FETCH_TICKET_BY_ID);
        }
    });
}
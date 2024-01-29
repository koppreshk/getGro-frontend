import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useGetQueryEndPoint } from "../containers";

export const useUnlinkCustomer = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    const queryKey = useGetQueryEndPoint();

    const unLinkCustomer = useCallback((args: { ticketId: string }) =>
        postData(`${TicketsEndPoint.UNLINK_CUSTOMER}?ticket_id=${args.ticketId}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.UNLINK_CUSTOMER],
        mutationFn: unLinkCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });
}
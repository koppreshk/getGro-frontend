import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";

interface IUpdateStatusArgs {
    ticketId: string;
    statusId: number;
}

export const useUpdateStatus = () => {
    const { postData } = useServiceClient();

    const updateStatus = useCallback((args: IUpdateStatusArgs) =>
        postData(`${TicketsEndPoint.UPDATE_STATUS}?ticket_id=${args.ticketId}&status_id=${args.statusId}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.UPDATE_STATUS],
        mutationFn: updateStatus
    });
}
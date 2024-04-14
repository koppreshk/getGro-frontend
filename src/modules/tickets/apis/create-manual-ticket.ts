import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useGetQueryEndPoint } from "../containers";

interface ICreateManualTicketArgs {
    title: string;
    priority_id: string;
    remarks: string;
    channel_id: string;
    tag_id: string[];
    queue_id: string;
    employee_id: string;
}

export const useCreateManualTicket = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    const queryKey = useGetQueryEndPoint();

    const createManualTicket = useCallback((args: ICreateManualTicketArgs) =>
        postData(`${TicketsEndPoint.CREATE_MANUAL_TICKET}`, {
            body: args
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.CREATE_MANUAL_TICKET],
        mutationFn: createManualTicket,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });
}
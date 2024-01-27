import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

interface IAttachCustomerArgs {
    ticketId: string;
    email: string;
    firstName: string;
    lastName: string;
    id: number;
}

export const useAttachCustomer = () => {
    const { postData } = useServiceClient();

    const attachCustomer = useCallback((args: IAttachCustomerArgs) =>
        postData(`${TicketsEndPoint.ATTACH_CUSTOMER}?ticket_id=${args.ticketId}&email=${args.email}&first_name=${args.firstName}&last_name=${args.lastName}&oms_customer_id=${args.id}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.ATTACH_CUSTOMER],
        mutationFn: attachCustomer
    });
}
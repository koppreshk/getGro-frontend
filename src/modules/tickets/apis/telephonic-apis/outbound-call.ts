import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";

interface IOutboundCallArgs {
    exophone: string;
    to: string;
}

export const useOutboundCall = () => {
    const { postData } = useServiceClient();

    const onOutboundCall = useCallback((args: IOutboundCallArgs) =>
        postData(`${TicketsEndPoint.OUTBOUND_CALL}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.OUTBOUND_CALL],
        mutationFn: onOutboundCall
    });
}
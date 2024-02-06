import { useServiceClient } from "lib"
import React from "react";
import { EscalationQueryKey, EscalationEndPoint } from "./api-enums";
import { useMutation } from "react-query";

export interface ICreateEscalationsArgs {
    name: string;
    after: string;
    condition: string;
    alertTime: number;
    status: string;
    subStatus: string
}

export const useCreateEscalations = () => {
    const { postData } = useServiceClient();

    const createEscalation = React.useCallback((args: ICreateEscalationsArgs) =>
        postData(`${EscalationEndPoint.CREATE_ESCALATION}`, {
            name: args.name,
            after: args.after,
            condition: args.condition,
            alert_time: args.alertTime,
            status: args.status,
            sub_status: args.subStatus
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.CREATE_ESCALATION,
        mutationFn: createEscalation
    });
}
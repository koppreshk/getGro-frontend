import { useServiceClient } from "lib";
import React from "react";
import { useMutation } from "react-query";
import { UpdateTicketTriggersEndPoint, UpdateTicketTriggersQueryKey } from "./api-enums";
import { ICreateUpdateTicketTriggersArgs } from "./create-auto-assignment";

export const useEditUpdateTicketTriggers = () => {
    const { postData } = useServiceClient();

    const editUpdateTicketTriggers = React.useCallback((args: ICreateUpdateTicketTriggersArgs & { id: string }) => postData(UpdateTicketTriggersEndPoint.EDIT_ASSIGNMENT, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: UpdateTicketTriggersQueryKey.EDIT_ASSIGNMENT,
        mutationFn: editUpdateTicketTriggers
    });
}
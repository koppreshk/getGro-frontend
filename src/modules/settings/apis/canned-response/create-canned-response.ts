import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { CannedResponseTypeEndPoint, CannedResponseTypeQueryKey } from "./api-enums";

interface ICreateStatusArgs {
    name: string;
}

export const useCreateCannedResponse = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const createticketStatus = React.useCallback((args: ICreateStatusArgs) => postData(CannedResponseTypeEndPoint.CREATE_STATUS,
        {
            name: args.name
        }
    ).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: CannedResponseTypeQueryKey.CREATE_STATUS,
        mutationFn: createticketStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(CannedResponseTypeQueryKey.FETCH_ALL_STATUSES);
        }
    });
}
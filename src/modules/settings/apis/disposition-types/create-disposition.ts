import React from "react";
import { useServiceClient } from "lib"
import { DispositionTypeEndPoint, DispositionTypeQueryKey } from "./api-enums";
import { useMutation, useQueryClient } from "react-query";

interface ICreateDispositionArgs {
    name: string;
}

export const useCreateDisposition = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    
    const createDisposition = React.useCallback((args: ICreateDispositionArgs) => postData(DispositionTypeEndPoint.CREATE_DISPOSITION,
        {
            name: args.name
        }
    ).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: DispositionTypeQueryKey.CREATE_DISPOSITION,
        mutationFn: createDisposition,
        onSuccess: () => {
            queryClient.invalidateQueries(DispositionTypeQueryKey.FETCH_ALL_DISPOSITIONS);
        }
    });
}
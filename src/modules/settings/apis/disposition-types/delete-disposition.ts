import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib"
import { DispositionTypeEndPoint, DispositionTypeQueryKey } from "./api-enums";

interface IDeleteDispositionArgs {
    id: number;
}

export const useDeleteDisposition = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteDisposition = React.useCallback((args: IDeleteDispositionArgs) => postData(DispositionTypeEndPoint.DELETE_DISPOSITION,
        { id: args.id }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: deleteDisposition,
        mutationKey: DispositionTypeQueryKey.DELETE_DISPOSITION,
        onSuccess: () => {
            queryClient.invalidateQueries(DispositionTypeQueryKey.FETCH_ALL_DISPOSITIONS);
        }
    })
}
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib"
import { DispositionTypeEndPoint, DispositionTypeQueryKey } from "./api-enums";

interface IEditDipostionArgs {
    id: number;
    name: string;
}

export const useEditDisposition = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editDisposition = React.useCallback((args: IEditDipostionArgs) => postData(DispositionTypeEndPoint.EDIT_DISPOSITION, { id: args.id, name: args.name }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: DispositionTypeQueryKey.EDIT_DISPOSITION,
        mutationFn: editDisposition,
        onSuccess: () => {
            queryClient.invalidateQueries(DispositionTypeQueryKey.FETCH_ALL_DISPOSITIONS);
        }
    });
}
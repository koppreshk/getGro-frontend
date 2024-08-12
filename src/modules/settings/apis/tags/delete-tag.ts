import React from "react";
import { useServiceClient } from "lib"
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { useMutation, useQueryClient } from "react-query";

export interface IDeleteTagArgs {
    id: number;
}

export const useDeleteTag = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteTag = React.useCallback((args: IDeleteTagArgs) =>
        postData(`${ConfigurationsEndPoint.DELETE_TAG}`, {
            id: args.id,
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: ConfigurationsQueryKey.DELETE_TAG,
        mutationFn: deleteTag,
        onSuccess: () => {
            queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_ALL_TAGS);
        }
    });
}
import React from "react";
import { useServiceClient } from "lib"
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { useMutation, useQueryClient } from "react-query";

export interface IEditTagArgs {
    id: string;
    name: string;
}

export const useEditTag = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editTag = React.useCallback((args: IEditTagArgs) =>
        postData(`${ConfigurationsEndPoint.EDIT_TAG}`, {
            id: args.id,
            name: args.name
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: ConfigurationsQueryKey.EDIT_TAG,
        mutationFn: editTag,
        onSuccess: () => {
            queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_TAGS_BY_CHANNEL);
        }
    });
}
import React from "react";
import { useServiceClient } from "lib"
import { InstagramConfigurationEndPoint, InstagramConfigurationQueryKey} from "./api-enum";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteInstagramConfiguration = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteInstagramConfig = React.useCallback(() =>
        postData(InstagramConfigurationEndPoint.DELETE_INSTAGRAM_CONFIGURATION).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: deleteInstagramConfig,
        mutationKey: InstagramConfigurationQueryKey.DELETE_INSTAGRAM_CONFIGURATION,
        onSuccess: () => {
            queryClient.invalidateQueries(InstagramConfigurationQueryKey.FETCH_INSTAGRAM_CONFIGURATION);
        }
    })
};

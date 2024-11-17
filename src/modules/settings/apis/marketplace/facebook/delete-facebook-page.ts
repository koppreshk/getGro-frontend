import React from "react";
import { useServiceClient } from "lib"
import { FacebookConfigurationEndPoint,  FacebookConfigurationQueryKey} from "./api-enum";
import { useMutation, useQueryClient } from "react-query";

export interface IDeleteFacebookPage {
    id: string
}

export const useDeleteFacebookPage = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteFacebookPage = React.useCallback((args: IDeleteFacebookPage) =>
        postData(FacebookConfigurationEndPoint.DELETE_FACEBOOK_PAGE, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: deleteFacebookPage,
        mutationKey: FacebookConfigurationQueryKey.DELETE_FACEBOOK_PAGE,
        onSuccess: () => {
            queryClient.invalidateQueries(FacebookConfigurationQueryKey.FETCH_CONFIGURED_PAGES);
        }
    })
};

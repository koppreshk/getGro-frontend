import React from "react";
import { useServiceClient } from "lib"
import { IAddFacebookPageArgs } from "./add-facebook-page";
import { FacebookConfigurationEndPoint, FacebookConfigurationQueryKey } from "./api-enum";
import { useMutation, useQueryClient } from "react-query";

export const useEditFacebookPage = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const FacebookConfiguration = React.useCallback((args: IAddFacebookPageArgs & { id: string }) =>
        postData(`${FacebookConfigurationEndPoint.EDIT_FACEBOOK_PAGE}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: FacebookConfigurationQueryKey.EDIT_FACEBOOK_PAGE,
        mutationFn: FacebookConfiguration,
        onSuccess: () => {
            queryClient.invalidateQueries(FacebookConfigurationQueryKey.FETCH_CONFIGURED_PAGES)
        }
    });
}
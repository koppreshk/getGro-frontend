import React from "react";
import { useServiceClient } from "lib"
import { FacebookConfigurationEndPoint, FacebookConfigurationQueryKey } from "./api-enum";
import { useMutation, useQueryClient } from "react-query";

export interface IAddFacebookPageArgs {
    page_id: string;
    comment_configuration: string;
    can_send_auto_reply: boolean;
    auto_reply_text: string;
    name: string;
    specific_keywords: string[];
    queue_id: string;
}

export const useAddFacebookPage = () => {
    const { postData } = useServiceClient();
    const qc = useQueryClient();

    const FacebookConfiguration = React.useCallback((args: IAddFacebookPageArgs) =>
        postData(`${FacebookConfigurationEndPoint.ADD_FACEBOOK_PAGE}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: FacebookConfigurationQueryKey.ADD_FACEBOOK_PAGE,
        mutationFn: FacebookConfiguration,
        onSuccess: () => {
            qc.invalidateQueries(FacebookConfigurationQueryKey.FETCH_CONFIGURED_PAGES)
        }
    });
}
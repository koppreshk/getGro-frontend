import React from "react";
import { useServiceClient } from "lib"
import { FacebookConfigurationEndPoint, FacebookConfigurationQueryKey } from "./api-enum";
import { useMutation } from "react-query";

export interface IFacebookConfigurationArgs {
    code: string;
}

export const useFacebookConfiguration = () => {
    const { postData } = useServiceClient();

    const FacebookConfiguration = React.useCallback((args: IFacebookConfigurationArgs) =>
        postData(`${FacebookConfigurationEndPoint.CREATE_FACEBOOK_CONFIGURATION}`, {
            code: args.code,
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: FacebookConfigurationQueryKey.CREATE_FACEBOOK_CONFIGURATION,
        mutationFn: FacebookConfiguration
    });
}
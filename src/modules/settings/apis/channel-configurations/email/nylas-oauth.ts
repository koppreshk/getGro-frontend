import React from "react";
import { useServiceClient } from "lib"
import { ConfigurationsEmailEndPoint, ConfigurationsEmailQueryKey } from "./api-enums";
import { useMutation } from "react-query";

export interface INylasOAuthArgs {
    code: string;
}

export const useNylasOAuth = () => {
    const { postData } = useServiceClient();

    const nylasOAuth = React.useCallback((args: INylasOAuthArgs) =>
        postData(`${ConfigurationsEmailEndPoint.NYLAS_OAUTH}`, {
            code: args.code,
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: ConfigurationsEmailQueryKey.NYLAS_OAUTH,
        mutationFn: nylasOAuth
    });
}
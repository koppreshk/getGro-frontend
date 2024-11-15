import React from "react";
import { useServiceClient } from "lib"
import { InstagramConfigurationEndPoint, InstagramConfigurationQueryKey } from "./api-enum";
import { useMutation } from "react-query";

export interface IinstagramConfigurationArgs {
    code: string;
}

export const useCreateinstagramConfiguration = () => {
    const { postData } = useServiceClient();

    const instagramConfiguration = React.useCallback((args: IinstagramConfigurationArgs) =>
        postData(`${InstagramConfigurationEndPoint.CREATE_INSTAGRAM_CONFIGURATION}`, {
            code: args.code,
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: InstagramConfigurationQueryKey.CREATE_INSTAGRAM_CONFIGURATION,
        mutationFn: instagramConfiguration
    });
}
import React from "react";
import { useServiceClient } from "lib"
import { InstagramConfigurationEndPoint, InstagramConfigurationQueryKey } from "./api-enum";
import { useMutation, useQueryClient } from "react-query";

export interface IinstagramConfigurationArgs {
    /**
     * for create
     */
    code: string;
    queue_id: number;
    comment_configuration: string;
    specific_keywords: string[] | null; // Array of strings or null
    send_auto_reply: boolean;
    auto_reply_message: string;
    /**
     * for edit
     */
    id?: number;
}

export const useCreateInstagramConfiguration = () => {
    const { postData } = useServiceClient();
    const qc = useQueryClient();

    const instagramConfiguration = React.useCallback((args: IinstagramConfigurationArgs) =>
        postData(`${InstagramConfigurationEndPoint.CREATE_INSTAGRAM_CONFIGURATION}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: InstagramConfigurationQueryKey.CREATE_INSTAGRAM_CONFIGURATION,
        mutationFn: instagramConfiguration,
        onSuccess: () => {
            qc.invalidateQueries(InstagramConfigurationQueryKey.FETCH_INSTAGRAM_CONFIGURATION)
        }
    });
}

export const useEditInstagramConfiguration = () => {
    const { postData } = useServiceClient();
    const qc = useQueryClient();

    const instagramConfiguration = React.useCallback((args: Omit<IinstagramConfigurationArgs, 'code'>) =>
        postData(`${InstagramConfigurationEndPoint.EDIT_INSTAGRAM_CONFIGURATION}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: InstagramConfigurationQueryKey.EDIT_INSTAGRAM_CONFIGURATION,
        mutationFn: instagramConfiguration,
        onSuccess: () => {
            qc.invalidateQueries(InstagramConfigurationQueryKey.FETCH_INSTAGRAM_CONFIGURATION)
        }
    });
}

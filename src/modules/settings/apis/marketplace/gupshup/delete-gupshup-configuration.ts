import React from "react";
import { useServiceClient } from "lib"
import { GupShupConfigurationEndPoint, GupShupConfigurationQueryKey } from ".";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteGupShupConfiguration = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteWhatsAppConfig = React.useCallback(() =>
        postData(GupShupConfigurationEndPoint.DELETE_WHATSAPP_CONFIG).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: deleteWhatsAppConfig,
        mutationKey: GupShupConfigurationQueryKey.DELETE_WHATSAPP_CONFIG,
        onSuccess: () => {
            queryClient.invalidateQueries(GupShupConfigurationQueryKey.FETCH_WHATSAPP_CONFIG);
        }
    })
};

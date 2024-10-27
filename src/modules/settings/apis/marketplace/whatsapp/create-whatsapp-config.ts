import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

export interface ICreateWhatsAppArgs {
    app_id: string;
    api_secret: string;
    whatsapp_token: string;
}

export const useCreateWhatsAppConfiguration = () => {
    const { postData } = useServiceClient();

    const setupWhatsAppConfig = React.useCallback((args: ICreateWhatsAppArgs) =>
        postData(WhatsAppConfigurationEndPoint.CREATE_WHATSAPP_CONFIG, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: setupWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.CREATE_WHATSAPP_CONFIG
    })
}
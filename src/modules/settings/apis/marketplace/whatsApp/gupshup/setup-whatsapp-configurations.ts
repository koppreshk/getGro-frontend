import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

export interface ISetupWhatsAppArgs {
    app_name: string;
    api_key: string;
    number: string;
    app_id: string;
    webhook_url?: string;
}

export const useSetupWhatsAppConfigurations = () => {
    const { postData } = useServiceClient();

    const setupWhatsAppConfig = React.useCallback((args: ISetupWhatsAppArgs) =>
        postData(WhatsAppConfigurationEndPoint.SETUP_WHATSAPP_CONFIG, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: setupWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.SETUP_WHATSAPP_CONFIG
    })
}
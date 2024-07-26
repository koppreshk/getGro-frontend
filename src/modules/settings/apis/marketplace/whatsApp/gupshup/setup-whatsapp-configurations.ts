import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

interface ISetupWhatsAppArgs {
    appName: string;
    apiKey: string;
    number: string;
    appId: string;
}

export const useSetupWhatsAppConfigurations = () => {
    const { postData } = useServiceClient();

    const setupWhatsAppConfig = React.useCallback((args: ISetupWhatsAppArgs) =>
        postData(WhatsAppConfigurationEndPoint.SETUP_WHATSAPP_CONFIG, {
            app_name: args.appName,
            api_key: args.apiKey,
            number: args.number,
            app_id: args.appId
        }), [postData]);

    return useMutation({
        mutationFn: setupWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.SETUP_WHATSAPP_CONFIG
    })
}
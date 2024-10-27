import React from "react";
import { useServiceClient } from "lib"
import { GupShupConfigurationEndPoint, GupShupConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

export interface ISetupGupShupArgs {
    app_name: string;
    api_key: string;
    number: string;
    app_id: string;
    webhook_url?: string;
}

export const useSetupGupshupConfigurations = () => {
    const { postData } = useServiceClient();

    const setupWhatsAppConfig = React.useCallback((args: ISetupGupShupArgs) =>
        postData(GupShupConfigurationEndPoint.SETUP_WHATSAPP_CONFIG, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: setupWhatsAppConfig,
        mutationKey: GupShupConfigurationQueryKey.SETUP_WHATSAPP_CONFIG
    })
}
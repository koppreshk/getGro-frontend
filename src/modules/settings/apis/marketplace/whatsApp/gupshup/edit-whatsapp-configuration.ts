import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

interface IEditWhatsAppArgs {
    appName: string;
    apiKey: string;
    number: string;
    appId: string;
}

export const useEditWhatsAppConfigurations = () => {
    const { postData } = useServiceClient();

    const editWhatsAppConfig = React.useCallback((args: IEditWhatsAppArgs) =>
        postData(WhatsAppConfigurationEndPoint.EDIT_WHATSAPP_CONFIG, {
            app_name: args.appName,
            api_key: args.apiKey,
            number: args.number,
            app_id: args.appId
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: editWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.EDIT_WHATSAPP_CONFIG
    })
}
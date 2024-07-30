import React from "react";
import { useServiceClient } from "lib"
import { ISetupWhatsAppArgs, WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

export const useEditWhatsAppConfigurations = () => {
    const { postData } = useServiceClient();

    const editWhatsAppConfig = React.useCallback((args: ISetupWhatsAppArgs) =>
        postData(WhatsAppConfigurationEndPoint.EDIT_WHATSAPP_CONFIG, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: editWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.EDIT_WHATSAPP_CONFIG
    })
}
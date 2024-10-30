import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation } from "react-query";
import { CreateWhatsAppNumberArgs } from "./create-whatsapp-number";

export const useEditWhatsAppNumber = () => {
    const { postData } = useServiceClient();

    const editWhatsAppConfig = React.useCallback((args: CreateWhatsAppNumberArgs & { id: number, is_active: boolean }) =>
        postData(WhatsAppConfigurationEndPoint.EDIT_WHATSAPP_NUMBER, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: editWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.EDIT_WHATSAPP_NUMBER
    })
}
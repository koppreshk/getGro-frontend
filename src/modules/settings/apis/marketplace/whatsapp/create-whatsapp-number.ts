import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation, useQueryClient } from "react-query";

export interface CreateWhatsAppNumberArgs {
    whatsapp_phone_number_id: string
    name: string
    whatsapp_business_id: string
    send_auto_reply: boolean
    auto_reply_message: string
}

export const useCreateWhatsAppNumber = () => {
    const { postData } = useServiceClient();
    const qc = useQueryClient();

    const CreateWhatsAppConfig = React.useCallback((args: CreateWhatsAppNumberArgs) =>
        postData(WhatsAppConfigurationEndPoint.CREATE_WHATSAPP_NUMBER, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: CreateWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.CREATE_WHATSAPP_NUMBER,
        onSuccess: () => {
            qc.invalidateQueries(WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBERS);
        }
    })
}
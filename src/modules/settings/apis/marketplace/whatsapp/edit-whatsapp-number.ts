import React from "react";
import { useServiceClient } from "lib"
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";
import { useMutation, useQueryClient } from "react-query";
import { CreateWhatsAppNumberArgs } from "./create-whatsapp-number";

export const useEditWhatsAppNumber = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editWhatsAppConfig = React.useCallback((args: CreateWhatsAppNumberArgs & { id: number, is_active: boolean }) =>
        postData(WhatsAppConfigurationEndPoint.EDIT_WHATSAPP_NUMBER, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: editWhatsAppConfig,
        mutationKey: WhatsAppConfigurationQueryKey.EDIT_WHATSAPP_NUMBER,
        onSuccess: () => {
            queryClient.invalidateQueries(WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBERS);
        }
    })
}
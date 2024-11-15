import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";

export interface IWhatsAppConfigDetails {
    app_id: string
    app_secret: string
    whatsapp_token: string
    created_at: string
    updated_at: string
    created_by: string
    updated_by: string | null;
  }

export const useFetchWhatsAppConfiguration = () => {
    const { getData } = useServiceClient();

    const fetchWhatsappConfigurations = React.useCallback(() => getData(WhatsAppConfigurationEndPoint.FETCH_WHATSAPP_CONFIG).then((res) => res.json()), [getData]);

    return useQuery<IWhatsAppConfigDetails>({
        queryFn: fetchWhatsappConfigurations,
        queryKey: WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_CONFIG
    });
}
import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";

export interface IWhatsAppConfigDetails {
    app_name: string;
    api_key: string;
    number: string;
    app_id: string;
    webhook_url: string;
}

export const useFetchWhatsAppConfiguration = () => {
    const { getData } = useServiceClient();

    const fetchWhatsappConfigurations = React.useCallback(() => getData(WhatsAppConfigurationEndPoint.FETCH_WHATSAPP_CONFIG).then((res) => res.json()), [getData]);

    return useQuery<IWhatsAppConfigDetails>({
        queryFn: fetchWhatsappConfigurations,
        queryKey: WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_CONFIG
    });
}
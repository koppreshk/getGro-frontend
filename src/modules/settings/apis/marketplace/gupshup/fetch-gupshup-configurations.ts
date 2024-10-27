import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { GupShupConfigurationEndPoint, GupShupConfigurationQueryKey } from ".";

export interface IWhatsAppConfigDetails {
    app_name: string;
    api_key: string;
    number: string;
    app_id: string;
    webhook_url: string;
}

export const useFetchGupshupConfiguration = () => {
    const { getData } = useServiceClient();

    const fetchWhatsappConfigurations = React.useCallback(() => getData(GupShupConfigurationEndPoint.FETCH_WHATSAPP_CONFIG).then((res) => res.json()), [getData]);

    return useQuery<IWhatsAppConfigDetails>({
        queryFn: fetchWhatsappConfigurations,
        queryKey: GupShupConfigurationQueryKey.FETCH_WHATSAPP_CONFIG
    });
}
import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";

export interface IExotelConfigDetails {
    exotel_subdomain: string
    exotel_api_key: string
    exotel_api_token: string
    exotel_account_sid: string
    webhook_url: string
}

export const useFetchExotelConfiguration = () => {
    const { getData } = useServiceClient();

    const fetchExotelConfigurations = React.useCallback(() => getData(ExotelConfigurationEndPoint.FETCH_EXOTEL_CONFIG).then((res) => res.json()), [getData]);

    return useQuery<IExotelConfigDetails>({
        queryFn: fetchExotelConfigurations,
        queryKey: ExotelConfigurationQueryKey.FETCH_EXOTEL_CONFIG
    });
}
import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";

export interface ISDKToken {
    access_token: string;
}

export const useFetchSDKToken = (isEnabled: boolean) => {
    const { getData } = useServiceClient();

    const fetchSDKToken = React.useCallback(() => getData(ExotelConfigurationEndPoint.FETCH_SDK_ACCESS_TOKEN)
        .then((res) => res.json()), [getData]);

    return useQuery<ISDKToken>({
        queryKey: ExotelConfigurationQueryKey.FETCH_SDK_ACCESS_TOKEN,
        queryFn: fetchSDKToken,
        enabled: isEnabled
    })
}
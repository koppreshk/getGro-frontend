import { useServiceClient } from "lib"
import React from "react";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";
import { useMutation } from "react-query";

export interface IExotelConfigDetails {
    exotel_subdomain: string
    exotel_api_key: string
    exotel_api_token: string
    exotel_account_sid: string
    webhook_url?: string
}

export const useSetupExotelConfigurations = () => {
    const { postData } = useServiceClient();

    const setupExotel = React.useCallback((args: IExotelConfigDetails) =>
        postData(ExotelConfigurationEndPoint.INSTALL_EXOTEL_CONFIG, args), [postData]);

    return useMutation({
        mutationFn: setupExotel,
        mutationKey: ExotelConfigurationQueryKey.INSTALL_EXOTEL_CONFIG
    })
}
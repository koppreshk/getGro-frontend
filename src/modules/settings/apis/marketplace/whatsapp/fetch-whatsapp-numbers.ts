import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { WhatsAppConfigurationEndPoint, WhatsAppConfigurationQueryKey } from ".";

export interface IWhatsAppNumbers {
    id: number
    name: string
    whatsapp_number: string
    whatsapp_phone_number_id: string
    whatsapp_business_id: string
    created_by: string
    updated_by: string | null;
    created_at: string
    updated_at: string

}

export const useFetchWhatsAppNumbers = () => {
    const { getData } = useServiceClient();

    const fetchExotelConfigurations = React.useCallback(() => getData(WhatsAppConfigurationEndPoint.FETCH_WHATSAPP_NUMBERS).then((res) => res.json()), [getData]);

    return useQuery<IWhatsAppNumbers[]>({
        queryFn: fetchExotelConfigurations,
        queryKey: WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBERS
    });
}

export const useFetchWhatsAppNumber = (id: number) => {
    const { getData } = useServiceClient();

    const fetchExotelConfigurations = React.useCallback(() => getData(`${WhatsAppConfigurationEndPoint.FETCH_WHATSAPP_NUMBER}?id=${id}`).then((res) => res.json()), [getData, id]);

    return useQuery<IWhatsAppNumbers[]>({
        queryFn: fetchExotelConfigurations,
        queryKey: [WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBER, id]
    });
}
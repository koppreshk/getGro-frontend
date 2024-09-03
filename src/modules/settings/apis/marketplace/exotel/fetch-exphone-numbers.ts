import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";

export interface Exophone {
    phone_number: string;
    sid: string;
    friendly_name: string;
}

export interface IExophonesNumbers {
    exophones: Exophone[];
}

export const useFetchExophoneNumbers = () => {
    const { getData } = useServiceClient();

    const fetchExophoneNumbers = React.useCallback(() => getData(ExotelConfigurationEndPoint.FETCH_EXPHONE_NUMBERS)
        .then((res) => res.json()), [getData]);

    return useQuery<IExophonesNumbers>({
        queryKey: ExotelConfigurationQueryKey.FETCH_EXPHONE_NUMBERS,
        queryFn: fetchExophoneNumbers
    })
}
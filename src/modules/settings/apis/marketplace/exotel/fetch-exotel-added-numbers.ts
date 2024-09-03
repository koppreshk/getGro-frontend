import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";

export interface IExotelAddedNumbers {
    id: number;
    phone_number: string;
    sid: string;
    friendly_name: string;
    exotel_group_name: string;
    users: []
}

export const useFetchExotelAddedNumbers = () => {
    const { getData } = useServiceClient();

    const fetchExotelConfigurations = React.useCallback(() => getData(ExotelConfigurationEndPoint.FETCH_EXOTEL_ADDED_NUMBERS).then((res) => res.json()), [getData]);

    return useQuery<IExotelAddedNumbers[]>({
        queryFn: fetchExotelConfigurations,
        queryKey: ExotelConfigurationQueryKey.FETCH_EXOTEL_ADDED_NUMBERS
    });
}
import { useServiceClient } from "lib";
import React from "react";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useQuery } from "react-query";

export interface IPriorities {
    id: number;
    name: string;
}

export const useFetchPriorities = () => {
    const { getData } = useServiceClient();

    const getOrderDetailsData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_PRIORITY_DROPDOWN_VALUES}`).then((res) => res.json()).catch((err) => err), [getData]);
    return useQuery<IPriorities[], { message: string }>({
        queryKey: [TicketsQueryKey.FETCH_PRIORITY_DROPDOWN_VALUES],
        queryFn: getOrderDetailsData,
        cacheTime: 0
    });
}
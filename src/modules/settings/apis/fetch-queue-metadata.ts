import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";

export interface IQueueMetadata {
    auto_assign_types: string[]
    queue_types: string[]
    employees: Employee[]
}

export interface Employee {
    firstName: string
    lastName?: string
    id: number
}

export const useFetchTicketMetadata = () => {
    const { getData } = useServiceClient();

    const fetchTicketMetadata = React.useCallback(() => getData(`${ConfigurationsEndPoint.FETCH_DROPDOWN_VALUES}`).then((res) => res.json()), [getData])

    return useQuery<IQueueMetadata>({
        queryKey: ConfigurationsQueryKey.FETCH_DROPDOWN_VALUES,
        queryFn: fetchTicketMetadata
    });
}
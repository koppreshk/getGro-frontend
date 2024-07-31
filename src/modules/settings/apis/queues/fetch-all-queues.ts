import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib"
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";

export interface Employee {
    firstName: string;
    lastName: string | null;
    id: number;
}

export interface Queue {
    id: number;
    name: string;
    uniqueKey: string;
    assignedEmployees: Employee[];
}

export interface ITicketQueues {
    queues: Queue[];
    total_pages: number;
    employees: Employee[];
}

export const useFetchAllTicketQueues = () => {
    const { getData } = useServiceClient();

    const fetchAllTicketsQueue = React.useCallback(() => getData(`${ConfigurationsEndPoint.FETCH_ALL_TICKETS_QUEUE}?page=1&items_per_page=10`).then((res) => res.json()), [getData])

    return useQuery<ITicketQueues>({
        queryKey: ConfigurationsQueryKey.FETCH_ALL_TICKETS_QUEUE,
        queryFn: fetchAllTicketsQueue,
        keepPreviousData: true
    });
}
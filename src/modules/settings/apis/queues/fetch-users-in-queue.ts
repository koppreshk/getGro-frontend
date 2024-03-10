import React from "react";
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";

export interface IQueueUsers {
    firstName: string;
    lastName: string;
    id: number;
}

export const useFetchUsersInQueue = () => {

    const { getData } = useServiceClient();

    const fetchTicketMetadata = React.useCallback(() => getData(`${ConfigurationsEndPoint.FETCH_USERS_IN_QUEUE}`).then((res) => res.json()), [getData])

    return useQuery<IQueueUsers>({
        queryFn: fetchTicketMetadata,
        queryKey: ConfigurationsQueryKey.FETCH_USERS_IN_QUEUE,
    });
}

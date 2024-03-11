import React from "react";
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";

export interface IQueueUsers {
    firstName: string;
    lastName: string;
    id: number;
}

export const useFetchUsersInQueue = (queueId: string) => {

    const { getData } = useServiceClient();

    const fetchTicketMetadata = React.useCallback(() => getData(`${ConfigurationsEndPoint.FETCH_USERS_IN_QUEUE}?queue_id=${queueId}`).then((res) => res.json()), [getData])

    return useQuery<IQueueUsers[]>({
        queryFn: fetchTicketMetadata,
        queryKey: ConfigurationsQueryKey.FETCH_USERS_IN_QUEUE,
    });
}

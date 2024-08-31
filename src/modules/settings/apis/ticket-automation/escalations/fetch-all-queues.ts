import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { EscalationQueryKey, EscalationEndPoint } from "./api-enums";

interface IQueueMetadata {
    "id": number,
    "name": string,
    "uniqueKey": string
}

export const useFetchAllQueues = (isEnabled = true) => {
    const { getData } = useServiceClient();

    const fetchAllQueues = React.useCallback(() =>
        getData(`${EscalationEndPoint.FETCH_ALL_QUEUES}`).then((res) => res.json()), [getData]);

    return useQuery<IQueueMetadata[]>({
        queryKey: EscalationQueryKey.FETCH_ALL_QUEUES,
        queryFn: fetchAllQueues,
        enabled: isEnabled
    });
}
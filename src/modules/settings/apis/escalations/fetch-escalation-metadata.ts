import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";

export interface IEscalationMetadata {
    queues: Queue[]
    after: string[]
    conditions: string[]
    statuses: string[]
    sub_statuses: string[]
  }
  
  export interface Queue {
    id: number
    name: string
    uniqueKey: string
  }

export const useFetchEscalationMetadata = () => {
    const { getData } = useServiceClient();

    const fetchEscalationMetadata = React.useCallback(() => getData(`${EscalationEndPoint.FETCH_ESCALATION_METADATA}`).then((res) => res.json()), [getData])

    return useQuery<IEscalationMetadata>({
        queryKey: EscalationQueryKey.FETCH_ESCALATION_METADATA,
        queryFn: fetchEscalationMetadata
    });
}
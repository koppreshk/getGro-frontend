import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";

export interface IEscalationMetadata {
  queues: Queue[]
  after: string[]
  conditions: string[]
  statuses: Status[]
  sub_statuses: SubStatus[]
  escalate_to: EscalateTo[]
  priorities: Priority[]
}

export interface Queue {
  id: number
  name: string
  uniqueKey: string
}

export interface Status {
  id: number
  name: string
}

export interface SubStatus {
  id: number
  name: string
}

export interface EscalateTo {
  id: number
  name: string
  uniqueKey: string
}

export interface Priority {
  id: number
  name: string
}

export const useFetchEscalationMetadata = () => {
  const { getData } = useServiceClient();

  const fetchEscalationMetadata = React.useCallback(() => getData(`${EscalationEndPoint.FETCH_ESCALATION_METADATA}`).then((res) => res.json()), [getData])

  return useQuery<IEscalationMetadata>({
    queryKey: EscalationQueryKey.FETCH_ESCALATION_METADATA,
    queryFn: fetchEscalationMetadata
  });
}
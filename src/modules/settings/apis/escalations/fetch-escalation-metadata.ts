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
  channels: Channel[]
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

export interface ChannelTag {
  tag_id: number;
  tag: string;
}

export interface Channel {
  channel_id: number;
  name: string;
  tags: ChannelTag[];
}

export const useFetchEscalationMetadata = () => {
  const { getData } = useServiceClient();

  const fetchEscalationMetadata = React.useCallback(() => getData(`${EscalationEndPoint.FETCH_ESCALATION_METADATA}`).then((res) => res.json()), [getData])

  return useQuery<IEscalationMetadata>({
    queryKey: EscalationQueryKey.FETCH_ESCALATION_METADATA,
    queryFn: fetchEscalationMetadata
  });
}
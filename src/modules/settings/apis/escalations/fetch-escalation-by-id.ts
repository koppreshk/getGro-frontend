import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";

export interface IEscalationById {
  id: number
  name: string
  description: string
  evaluationType: EvaluationType
  byUser: ByUser
  ticketFields: TicketField[]
  targets: Target[]
  reminder: Reminder
  escalations: Escalations
}

interface EvaluationType {
  name: string
  value: number
}

interface ByUser {
  name: string
  id: number
}

interface TicketField {
  field: string
  value: number
  name: string
}

interface Target {
  priority_id: PriorityId
  time_to_first_response: number
  time_to_next_response: number
  time_to_resolution: number
  first_response_run_type: FirstResponseRunType
  next_response_run_type: NextResponseRunType
  resolution_run_type: ResolutionRunType
}

interface PriorityId {
  name: string
  id: number
}

interface FirstResponseRunType {
  name: string
  run_type: number
}

interface NextResponseRunType {
  name: string
  run_type: number
}

interface ResolutionRunType {
  name: string
  run_type: number
}

interface Reminder {
  fr_reminder_in: string
  nr_reminder_in: number
  rs_reminder_in: number
  queue_ids: number[]
  user_ids: number[]
}

interface Escalations {
  fr_escalation_type: string
  nr_escalation_type: number
  rs_escalation_type: number
  queue_ids: number[]
  user_ids: number[]
}

export const useFetchEscalationById = (id: number) => {
  const { getData } = useServiceClient();

  const fetchEscalationById = React.useCallback(() => getData(`${EscalationEndPoint.FETCH_ESCALATION_BY_ID}?id=${id}`).then((res) => res.json()), [getData, id])

  return useQuery<{ sla: IEscalationById }, { message: string }>({
    queryKey: EscalationQueryKey.FETCH_ESCALATION_BY_ID,
    queryFn: fetchEscalationById
  });
}
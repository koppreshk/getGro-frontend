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
  field_id: number
  value: number
}

interface Target {
  priority_id: number
  time_to_first_response: number
  time_to_next_response: number
  time_to_resolution: number
  first_response_run_type_id: number
  next_response_run_type_id: number
  resolution_run_type_id: number
}

interface Reminder {
  fr_reminder_id: number
  nr_reminder_id: number
  rs_reminder_id: number
  fr_queue_ids: string[]
  nr_queue_ids: string[]
  rs_queue_ids: string[]
  fr_user_ids: string[]
  nr_user_ids: string[]
  rs_user_ids: string[]
}

interface Escalations {
  fr_escalation_id: number
  nr_escalation_id: number
  rs_escalation_id: number
  fr_queue_ids: string[]
  nr_queue_ids: string[]
  rs_queue_ids: string[]
  fr_user_ids: string[]
  nr_user_ids: string[]
  rs_user_ids: string[]
}

export const useFetchEscalationById = (id: number) => {
  const { getData } = useServiceClient();

  const fetchEscalationById = React.useCallback(() => getData(`${EscalationEndPoint.FETCH_ESCALATION_BY_ID}?id=${id}`).then((res) => res.json()), [getData, id])

  return useQuery<{ sla: IEscalationById }, { message: string }>({
    queryKey: [EscalationQueryKey.FETCH_ESCALATION_BY_ID, id],
    queryFn: fetchEscalationById
  });
}
import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { AutoMationType } from '.';
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from './apis';

export interface IAssignment {
  id: number;
  name: string;
  description: string;
  rules: Rule[];
  associate_agent: AssociateAgent;
  is_active: boolean;
  trigger_actions: {
    field_trigger_action_id: string;
    value:
      | string
      | {
          queue_id: string;
          assignee_id: string;
        };
  }[];
}

interface Rule {
  id: number;
  ticket_field_id: number;
  operator_id: number;
  value: string | string[];
  rule_type: string;
}

interface AssociateAgent {
  queue_id: number;
  assignment_mode: string;
}

export const useFetchAssignment = (automationType: AutoMationType) => {
  const { getData } = useServiceClient();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';

  const fetchAssignment = React.useCallback(
    () =>
      getData(
        `${AutoAssignmentEndPoint.FETCH_ASSIGNMENT}?id=${id}&automation_type=${automationType}`
      ).then((res) => res.json()),
    [automationType, getData, id]
  );

  return useQuery<IAssignment, { message: string }>({
    queryKey: [AutoAssignmentQueryKey.FETCH_ASSIGNMENT, id, automationType],
    queryFn: fetchAssignment,
  });
};

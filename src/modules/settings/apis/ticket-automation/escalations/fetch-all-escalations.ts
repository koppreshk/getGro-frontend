import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { EscalationEndPoint, EscalationQueryKey } from './api-enums';

export interface IEscalationsNew {
  id: number;
  name: string;
  last_modified_by: string;
  is_active: boolean;
  last_modified_at: string;
}

export const useFetchAllEscalationsNew = () => {
  const { getData } = useServiceClient();

  const fetchAllEscalations = React.useCallback(
    () =>
      getData(`${EscalationEndPoint.FETCH_ALL_ESCALATIONS_NEW}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<
    { sla: IEscalationsNew[]; total_pages: number },
    { message: string }
  >({
    queryKey: EscalationQueryKey.FETCH_ALL_ESCALATIONS_NEW,
    queryFn: fetchAllEscalations,
  });
};

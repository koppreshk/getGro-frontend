import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { CannedResponseEndPoint, CannedResponseQueryKey } from './api-enums';

export interface CannedResponse {
  id: number; // Unique identifier for the template
  name: string; // Name of the template
  body: string; // Body of the template, supporting placeholders
  created_by: string; // Name of the creator of the template
  updated_by: string; // Name of the person who last updated the template
  created_at: string; // Date and time of template creation
  updated_at: string; // Date and time of the last update
  response_type: string; // Type of response (e.g., system, user)
  is_active: boolean; // Indicates whether the template is active or not
}

export const useFetchAllCannedResponses = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllCannedResponse = React.useCallback(
    () =>
      getData(CannedResponseEndPoint.FETCH_ALL_CANNED_RESPONSES).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<CannedResponse[], { message: string }>({
    queryKey: CannedResponseQueryKey.FETCH_ALL_CANNED_RESPONSEES,
    queryFn: fetchAllCannedResponse,
    enabled: isEnabled,
  });
};

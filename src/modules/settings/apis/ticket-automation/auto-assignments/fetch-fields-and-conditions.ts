import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from './apis';

export interface FetchFieldsAndConditions {
  ticketFieldId: number;
  fieldName: string;
  operators: Operator[];
  dropdownValues: DropdownValue[];
}

interface Operator {
  operatorId: number;
  operatorName: string;
}

interface DropdownValue {
  channel_id: number;
  name: string;
}

export const useFetchFieldsAndConditions = () => {
  const { getData } = useServiceClient();

  const fetchFieldsAndConditions = React.useCallback(
    () =>
      getData(AutoAssignmentEndPoint.FIELDS_AND_CONDITIONS).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<FetchFieldsAndConditions[]>({
    queryKey: AutoAssignmentQueryKey.FIELDS_AND_CONDITIONS,
    queryFn: fetchFieldsAndConditions,
  });
};

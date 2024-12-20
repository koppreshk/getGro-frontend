import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import {
  CreateTicketTriggersEndPoint,
  CreateTicketTriggersQueryKey,
} from './api-enums';

export interface TriggerActions {
  fieldTriggerActionId: number;
  name: string;
  dropdownValues: DropdownValue[];
}

interface DropdownValue {
  id: number;
  name: string;
  assignedEmployees?: AssignedEmployee[];
}

interface AssignedEmployee {
  firstName: string;
  lastName: string;
  id: number;
}

export const useFetchTriggerActions = () => {
  const { getData } = useServiceClient();

  const fetchTriggerActions = React.useCallback(
    () =>
      getData(CreateTicketTriggersEndPoint.TRIGGER_ACTIONS).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<TriggerActions[], { message: string }>({
    queryKey: CreateTicketTriggersQueryKey.TRIGGER_ACTIONS,
    queryFn: fetchTriggerActions,
  });
};

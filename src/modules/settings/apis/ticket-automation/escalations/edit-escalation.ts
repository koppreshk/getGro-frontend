import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { EscalationEndPoint, EscalationQueryKey } from './apis';
import { ICreateEscalationPayload } from './create-escalation';

export const useEditEscalationNew = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editEscalation = React.useCallback(
    (args: ICreateEscalationPayload & { id: number }) =>
      postData(`${EscalationEndPoint.EDIT_ESCALATION_NEW}`, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: EscalationQueryKey.EDIT_ESCALATION_NEW,
    mutationFn: editEscalation,
    onSuccess: () => {
      queryClient.invalidateQueries(
        EscalationQueryKey.FETCH_ALL_ESCALATIONS_NEW
      );
    },
  });
};

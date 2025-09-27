import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { EscalationQueryKey, EscalationEndPoint } from './apis';

export const useSetEscalationStatus = () => {
  const { postData } = useServiceClient();

  const setEscalationStatus = React.useCallback(
    (args: { id: number }) =>
      postData(
        `${EscalationEndPoint.SET_ESCALATION_STATUS}?id=${args.id}`
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: EscalationQueryKey.SET_ESCALATION_STATUS,
    mutationFn: setEscalationStatus,
  });
};

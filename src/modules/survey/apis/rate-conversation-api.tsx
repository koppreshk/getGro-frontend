import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { SurveyEndPoint, SurveyQueryKey } from './api-enums';

interface IRateConversation {
  ticket_id: number;
  rating: number;
}

export const useRateConversation = () => {
  const { postData } = useServiceClient();

  const rateConversation = React.useCallback(
    (args: IRateConversation) =>
      postData(SurveyEndPoint.RATE_CONVERSATION, {
        ticket_id: args.ticket_id,
        rating: args.rating,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: SurveyQueryKey.RATE_CONVERSATION,
    mutationFn: rateConversation,
  });
};

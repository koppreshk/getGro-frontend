import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { AgentPortalEndPoint, AgentPortalQueryKey } from './api-enums';

interface ISaveClientDetailsArgs {
  portal_name: string;
  logo: string;
}

export const useSaveClientDetails = () => {
  const { postData } = useServiceClient();

  const createticketStatus = React.useCallback(
    (args: ISaveClientDetailsArgs) =>
      postData(AgentPortalEndPoint.SAVE_CLIENT_DETAILS, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: AgentPortalQueryKey.SAVE_CLIENT_DETAILS,
    mutationFn: createticketStatus,
  });
};

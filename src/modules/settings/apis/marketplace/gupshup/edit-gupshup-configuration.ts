import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ISetupGupShupArgs,
  GupShupConfigurationEndPoint,
  GupShupConfigurationQueryKey,
} from '.';

export const useEditGupShupConfigurations = () => {
  const { postData } = useServiceClient();

  const editGupShupConfig = React.useCallback(
    (args: ISetupGupShupArgs) =>
      postData(GupShupConfigurationEndPoint.EDIT_WHATSAPP_CONFIG, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: editGupShupConfig,
    mutationKey: GupShupConfigurationQueryKey.EDIT_WHATSAPP_CONFIG,
  });
};

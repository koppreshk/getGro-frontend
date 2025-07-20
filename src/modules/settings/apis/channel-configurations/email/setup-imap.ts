import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ConfigurationsEmailEndPoint,
  ConfigurationsEmailQueryKey,
} from './api-enums';

export interface ISetupImapArgs {
  imap_username: string;
  imap_password: string;
  imap_host: string;
  imap_port: number;
  smtp_host: string;
  smtp_port: number;
}

export const useSetupImap = () => {
  const { postData } = useServiceClient();

  const setupImap = React.useCallback(
    (args: ISetupImapArgs) =>
      postData(
        `${ConfigurationsEmailEndPoint.CONNECT_IMAP_ACCOUNT}`,
        args
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsEmailQueryKey.CONNECT_IMAP_ACCOUNT,
    mutationFn: setupImap,
  });
};

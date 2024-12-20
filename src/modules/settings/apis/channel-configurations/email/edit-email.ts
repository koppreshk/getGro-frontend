import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ConfigurationsEmailQueryKey,
  ConfigurationsEmailEndPoint,
} from './api-enums';

export interface IEditEmailArgs {
  id: number;
  displayName: string;
  isActive: boolean;
}

export const useEditEmailConfig = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editEmail = React.useCallback(
    (args: IEditEmailArgs) =>
      postData(`${ConfigurationsEmailEndPoint.EDIT_EMAIL}`, {
        id: args.id,
        display_name: args.displayName,
        can_create_ticket: args.isActive,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsEmailQueryKey.EDIT_EMAIL,
    mutationFn: editEmail,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsEmailQueryKey.FETCH_ALL_EMAILS
      );
    },
  });
};

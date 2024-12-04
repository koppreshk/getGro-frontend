import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ConfigurationsWebFormsEndPoint,
  ConfigurationsWebFormsQueryKey,
} from './api-enums';

interface IDeleteWebFormsArgs {
  form_id: string | number;
}

export const useDeleteWebForm = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteWebForms = useCallback(
    (args: IDeleteWebFormsArgs) =>
      postData(`${ConfigurationsWebFormsEndPoint.DELETE_WEBFORM}`, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [ConfigurationsWebFormsQueryKey.DELETE_WEBFORM],
    mutationFn: deleteWebForms,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsWebFormsQueryKey.FETCH_ALL_WEBFORMS
      );
    },
  });
};

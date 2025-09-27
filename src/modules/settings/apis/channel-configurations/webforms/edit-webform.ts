import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ConfigurationsWebFormsEndPoint,
  ConfigurationsWebFormsQueryKey,
} from './apis';
import { ContactFormArgs } from './create-webform';

export const useEditWebForm = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editWebForm = React.useCallback(
    (args: ContactFormArgs & { form_id: string }) =>
      postData(`${ConfigurationsWebFormsEndPoint.EDIT_WEBFORM}`, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsWebFormsQueryKey.EDIT_WEBFORM,
    mutationFn: editWebForm,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsWebFormsQueryKey.FETCH_ALL_WEBFORMS
      );
    },
  });
};

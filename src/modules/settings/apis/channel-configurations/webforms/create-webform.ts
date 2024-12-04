import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ConfigurationsWebFormsEndPoint,
  ConfigurationsWebFormsQueryKey,
} from './api-enums';

export interface ContactFormArgs {
  web_form_name: string;
  form_title: string;
  form_description: string;
  footer_message: string;
  confirmation_message: string;
  submit_button_text: string;
  button_bg_color: string;
  button_text_color: string;
  form_height: string;
}

export const useCreateWebForm = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createWebForm = React.useCallback(
    (args: ContactFormArgs) =>
      postData(`${ConfigurationsWebFormsEndPoint.CREATE_WEBFORM}`, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsWebFormsQueryKey.CREATE_WEBFORM,
    mutationFn: createWebForm,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsWebFormsQueryKey.FETCH_ALL_WEBFORMS
      );
    },
  });
};

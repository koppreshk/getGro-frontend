import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  ConfigurationsWebFormsEndPoint,
  ConfigurationsWebFormsQueryKey,
} from './apis';

export interface IWebForms {
  form_id: number;
  web_form_name: string;
  form_title: string;
  form_description: string;
  footer_message: string;
  confirmation_message: string;
  token: string;
  submit_button_text: string;
  button_bg_color: string; // RGB or hex color as a string
  button_text_color: string; // Hex color as a string
  form_height: string; // Could be changed to a number if always numeric
}

export const useFetchAllWebForms = () => {
  const { getData } = useServiceClient();

  const fetchAllWebForms = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ConfigurationsWebFormsEndPoint.FETCH_ALL_WEBFORMS}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IWebForms[], { message: string }>({
    queryKey: ConfigurationsWebFormsQueryKey.FETCH_ALL_WEBFORMS,
    queryFn: fetchAllWebForms,
  });
};

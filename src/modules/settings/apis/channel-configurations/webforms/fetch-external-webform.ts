import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import {
  ConfigurationsWebFormsEndPoint,
  ConfigurationsWebFormsQueryKey,
} from './apis';

interface ExternalWebform {
  status: boolean;
  form: {
    id: number;
    web_form_name: string;
    form_title: string;
    form_description: string | null;
    footer_message: string | null;
    confirmation_message: string | null;
    submit_button_text: string;
    button_bg_color: string;
    button_text_color: string;
    form_height: string;
    client_id: number;
    admin_id: number;
    created_at: string; // ISO 8601 timestamp
    updated_at: string; // ISO 8601 timestamp
    auth_token: string;
  };
}

export const useFetchExternalWebform = (token: string) => {
  const params = useMemo(() => new URLSearchParams({ token: token }), [token]);

  const fetchAllWebForms = React.useCallback(
    () =>
      fetch(
        `${import.meta.env.VITE_REST_URL}${ConfigurationsWebFormsEndPoint.FETCH_EXTERNAL_WEFORM}?${params}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      ).then((res) => res.json()),
    [params]
  );

  return useQuery<ExternalWebform, { message: string }>({
    queryKey: ConfigurationsWebFormsQueryKey.FETCH_EXTERNAL_WEFORM,
    queryFn: fetchAllWebForms,
  });
};

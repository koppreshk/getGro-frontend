import React from 'react';
import { useMutation } from 'react-query';

import {
  ConfigurationsWebFormsEndPoint,
  ConfigurationsWebFormsQueryKey,
} from './api-enums';

interface IFormRequest {
  token: string;
  form_data: {
    name: string;
    email: string;
    subject: string;
    phone_number: string;
    help: string;
  };
}

export const useSubmitExternalWebform = () => {
  const submitWebform = React.useCallback(
    (formdata: IFormRequest) =>
      fetch(
        `${import.meta.env.VITE_REST_URL}${ConfigurationsWebFormsEndPoint.SUBMIT_WEBFORM}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formdata),
        }
      ).then((res) => res.json()),
    []
  );

  return useMutation({
    mutationKey: ConfigurationsWebFormsQueryKey.SUBMIT_WEBFORM,
    mutationFn: submitWebform,
  });
};

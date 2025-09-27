import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';
import { IExotelConfigDetails } from './setup-exotel-configurations';

export const useEditExotelConfigurations = () => {
  const { postData } = useServiceClient();

  const editExotel = React.useCallback(
    (args: IExotelConfigDetails) =>
      postData(ExotelConfigurationEndPoint.EDIT_EXOTEL_CONFIG, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: editExotel,
    mutationKey: ExotelConfigurationQueryKey.EDIT_EXOTEL_CONFIG,
  });
};

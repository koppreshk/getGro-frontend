import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';
import { IExotelConfigDetails } from './setup-exotel-configurations';

export const useFetchExotelConfiguration = () => {
  const { getData } = useServiceClient();

  const fetchExotelConfigurations = React.useCallback(
    () =>
      getData(ExotelConfigurationEndPoint.FETCH_EXOTEL_CONFIG).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<IExotelConfigDetails, { message: string }>({
    queryFn: fetchExotelConfigurations,
    queryKey: ExotelConfigurationQueryKey.FETCH_EXOTEL_CONFIG,
  });
};

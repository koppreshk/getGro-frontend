import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';
import { IExotelConfigDetails } from './setup-exotel-configurations';

export const useFetchExotelConfiguration = () => {
  const { getData } = useServiceClient();

  const fetchExotelConfigurations = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: ExotelConfigurationEndPoint.FETCH_EXOTEL_CONFIG,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IExotelConfigDetails, { message: string }>({
    queryFn: fetchExotelConfigurations,
    queryKey: ExotelConfigurationQueryKey.FETCH_EXOTEL_CONFIG,
  });
};

import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';

export interface Exophone {
  phone_number: string;
  sid: string;
  friendly_name: string;
}

export interface IExophonesNumbers {
  exophones: Exophone[];
}

export const useFetchExophoneNumbers = () => {
  const { getData } = useServiceClient();

  const fetchExophoneNumbers = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: ExotelConfigurationEndPoint.FETCH_EXPHONE_NUMBERS,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IExophonesNumbers>({
    queryKey: ExotelConfigurationQueryKey.FETCH_EXPHONE_NUMBERS,
    queryFn: fetchExophoneNumbers,
  });
};

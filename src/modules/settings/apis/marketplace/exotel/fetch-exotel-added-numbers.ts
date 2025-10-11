import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';

export interface IUser {
  firstName: string;
  lastName: string;
  id: number;
}

export interface IExotelAddedNumbers {
  id: number;
  phone_number: string;
  sid: string;
  friendly_name: string;
  exotel_group_name: string;
  users: IUser[];
}

export const useFetchExotelAddedNumbers = () => {
  const { getData } = useServiceClient();

  const fetchExotelConfigurations = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: ExotelConfigurationEndPoint.FETCH_EXOTEL_ADDED_NUMBERS,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IExotelAddedNumbers[]>({
    queryFn: fetchExotelConfigurations,
    queryKey: ExotelConfigurationQueryKey.FETCH_EXOTEL_ADDED_NUMBERS,
  });
};

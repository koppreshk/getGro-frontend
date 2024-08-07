import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { AgentsEndPoint, AgentsQueryKey } from "./api-enums";

export interface IUsers {
  id: number
  name: string
  role: string
  last_seen_at: null | string;
  is_deactivated?: boolean;
  verification_status: 'verified' | 'unverified';
}

export type UserType = 'all' | 'active' | 'unverified' | 'verified' | 'deactivated';

export const useFetchAllUsers = (type: UserType) => {
  const { getData } = useServiceClient();

  const fetchAllUsers = React.useCallback(() => getData(`${AgentsEndPoint.FETCH_ALL_USERS}?type=${type}`).then((res) => res.json()), [getData, type]);

  return useQuery<IUsers[], { message: string }>({
    queryKey: [AgentsQueryKey.FETCH_ALL_USERS, type],
    queryFn: fetchAllUsers
  })
}
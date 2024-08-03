import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { AgentsEndPoint, AgentsQueryKey } from "./api-enums";

export interface IUsers {
  id: number
  name: string
  role: string
  last_seen_at: null | string;
}

export const useFetchAllUsers = () => {
    const { getData } = useServiceClient();

    const fetchAllUsers = React.useCallback(() => getData(AgentsEndPoint.FETCH_ALL_USERS).then((res) => res.json()), [getData]);

    return useQuery<IUsers[], { message: string }>({
        queryKey: AgentsQueryKey.FETCH_ALL_USERS,
        queryFn: fetchAllUsers
    })
}
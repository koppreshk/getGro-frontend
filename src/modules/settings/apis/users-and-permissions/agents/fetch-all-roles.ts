import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { AgentsEndPoint, AgentsQueryKey } from "./api-enums";

export interface IRoles {
  id: number;
  name: string;
  description: string;
  role_type: string;
  agents: number;
}

export const useFetchAllRoles = () => {
    const { getData } = useServiceClient();

    const fetchAllRoles = React.useCallback(() => getData(AgentsEndPoint.FETCH_ALL_ROLES).then((res) => res.json()), [getData]);

    return useQuery<IRoles[], { message: string }>({
        queryKey: AgentsQueryKey.FETCH_ALL_ROLES,
        queryFn: fetchAllRoles
    })
}
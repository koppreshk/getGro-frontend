import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { AgentsEndPoint, AgentsQueryKey } from "./api-enums";

export interface IUserById {
    id: number
    name: string
    role_id: number
    email: string
    phone_number: string
    last_seen_at: string | null
}

export const useFetchUserById = (id: number | string) => {
    const { getData } = useServiceClient();

    const fetchUserById = React.useCallback(() => getData(`${AgentsEndPoint.FETCH_USER_BY_ID}?id=${id}`).then((res) => res.json()), [getData, id]);

    return useQuery<IUserById, { message: string }>({
        queryKey: [id, AgentsQueryKey.FETCH_USER_BY_ID],
        queryFn: fetchUserById
    })
}
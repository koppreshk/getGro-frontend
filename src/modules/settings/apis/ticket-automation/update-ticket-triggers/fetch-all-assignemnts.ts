import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { UpdateTicketTriggersEndPoint, UpdateTicketTriggersQueryKey } from "./api-enums";

export interface IAllAssignments {
    id: number
    name: string
    last_modified_by: string
    last_modified: string
    is_active: boolean
}

export const useFetchAllAssignments = () => {
    const { getData } = useServiceClient();

    const fetchAllAssignments = React.useCallback(() => getData(UpdateTicketTriggersEndPoint.FETCH_ALL_ASSIGNMENTS).then((res) => res.json()), [getData]);

    return useQuery<IAllAssignments[], { message: string }>({
        queryKey: UpdateTicketTriggersQueryKey.FETCH_ALL_ASSIGNMENTS,
        queryFn: fetchAllAssignments,
    })
}
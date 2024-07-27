import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from "./api-enums";

export interface IAllAssignments {
    id: number
    name: string
    last_modified_by: string
    last_modified: string
    is_active: boolean
}

export const useFetchAllAssignments = () => {
    const { getData } = useServiceClient();

    const fetchAllAssignments = React.useCallback(() => getData(AutoAssignmentEndPoint.FETCH_ALL_ASSIGNMENTS).then((res) => res.json()), [getData]);

    return useQuery<IAllAssignments[], { message: string }>({
        queryKey: AutoAssignmentQueryKey.FETCH_ALL_ASSIGNMENTS,
        queryFn: fetchAllAssignments,
    })
}
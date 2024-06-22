import { useServiceClient } from "lib"
import React from "react";
import { DispositionTypeEndPoint, DispositionTypeQueryKey } from "./api-enums";
import { useQuery } from "react-query";
import { IGenericResponse } from "./types";

export const useFetchAllStatuses = () => {
    const { getData } = useServiceClient();

    const fetchAllStatuses = React.useCallback(() => getData(DispositionTypeEndPoint.FETCH_ALL_STATUSES).then((res) => res.json()), [getData]);

    return useQuery<IGenericResponse[]>({
        queryKey: DispositionTypeQueryKey.FETCH_ALL_STATUSES,
        queryFn: fetchAllStatuses
    })
}
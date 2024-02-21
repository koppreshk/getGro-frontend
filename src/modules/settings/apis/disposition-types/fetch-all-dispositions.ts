import { useServiceClient } from "lib"
import React from "react";
import { DispositionTypeEndPoint, DispositionTypeQueryKey } from "./api-enums";
import { useQuery } from "react-query";

export interface IDispositionTypes {
    id: number;
    name: string;
}

export const useFetchAllDisposition = () => {
    const { getData } = useServiceClient();

    const fetchAllDispositions = React.useCallback(() => getData(DispositionTypeEndPoint.FETCH_ALL_DISPOSITIONS).then((res) => res.json()), [getData]);

    return useQuery<IDispositionTypes[]>({
        queryKey: DispositionTypeQueryKey.FETCH_ALL_DISPOSITIONS,
        queryFn: fetchAllDispositions
    })
}
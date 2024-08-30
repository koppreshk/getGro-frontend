import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { CannedResponseTypeEndPoint, CannedResponseTypeQueryKey } from "./api-enums";
import { IGenericResponse } from "./types";

export const useFetchAllCannedResponses = (isEnabled = true) => {
    const { getData } = useServiceClient();

    const fetchAllCannedResponse = React.useCallback(() => getData(CannedResponseTypeEndPoint.FETCH_ALL_STATUSES).then((res) => res.json()), [getData]);

    return useQuery<IGenericResponse[], { message: string }>({
        queryKey: CannedResponseTypeQueryKey.FETCH_ALL_STATUSES,
        queryFn: fetchAllCannedResponse,
        enabled: isEnabled
    })
}
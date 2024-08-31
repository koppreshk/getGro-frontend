import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { TemplatesTypeEndPoint, TemplatesTypeQueryKey } from "./api-enums";
import { IGenericResponse } from "./types";

export const useFetchAllTemplates = (isEnabled = true) => {
    const { getData } = useServiceClient();

    const fetchAllTemplates = React.useCallback(() => getData(TemplatesTypeEndPoint.FETCH_ALL_STATUSES).then((res) => res.json()), [getData]);

    return useQuery<IGenericResponse[], { message: string }>({
        queryKey: TemplatesTypeQueryKey.FETCH_ALL_STATUSES,
        queryFn: fetchAllTemplates,
        enabled: isEnabled
    })
}
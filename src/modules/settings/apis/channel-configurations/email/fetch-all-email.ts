import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ConfigurationsEmailQueryKey, ConfigurationsEmailEndPoint } from "./api-enums";

export interface IEmails {
    id: number;
    email: string;
}

export const useFetchAllEmails = () => {
    const { getData } = useServiceClient();

    const fetchAllEscalations = React.useCallback(() => getData(`${ConfigurationsEmailEndPoint.FETCH_ALL_EMAILS}`).then((res) => res.json()), [getData])

    return useQuery<{ sla: IEmails[], total_pages: number }, { message: string }>({
        queryKey: ConfigurationsEmailQueryKey.FETCH_ALL_EMAILS,
        queryFn: fetchAllEscalations
    });
}
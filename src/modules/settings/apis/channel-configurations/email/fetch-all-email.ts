import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ConfigurationsEmailQueryKey, ConfigurationsEmailEndPoint } from "./api-enums";

export interface IEmails {
    id: number;
    name: string;
    email: string;
    updated_on: string;
}

export const useFetchAllEmails = () => {
    const { getData } = useServiceClient();

    const fetchAllEmails = React.useCallback(() => getData(`${ConfigurationsEmailEndPoint.FETCH_ALL_EMAILS}`).then((res) => res.json()), [getData])

    return useQuery<IEmails[], { message: string }>({
        queryKey: ConfigurationsEmailQueryKey.FETCH_ALL_EMAILS,
        queryFn: fetchAllEmails
    });
}
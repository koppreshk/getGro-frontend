import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib"
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";

export interface ITag {
    id: number;
    name: string;
    tickets: number;
}

export const useFetchTagsById = (id: number) => {
    const { getData } = useServiceClient();

    const fetchTagsById = React.useCallback(() => getData(`${ConfigurationsEndPoint.FETCH_TAGS_BY_ID}?id=${id}`).then((res) => res.json()), [getData, id])

    return useQuery<ITag>({
        queryKey: [ConfigurationsQueryKey.FETCH_TAGS_BY_ID, id],
        queryFn: fetchTagsById,
    });
}
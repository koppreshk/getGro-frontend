import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib"
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";

export interface ITag {
    tag_id: number;
    tag: string;
}

export const useFetchTagsByChannel = (channelId: string) => {
    const { getData } = useServiceClient();

    const fetchTagsByChannel = React.useCallback(() => getData(`${ConfigurationsEndPoint.FETCH_TAGS_BY_CHANNEL}?channel_id=${channelId}`).then((res) => res.json()), [channelId, getData])

    return useQuery<ITag[]>({
        queryKey: [ConfigurationsQueryKey.FETCH_TAGS_BY_CHANNEL, channelId],
        queryFn: fetchTagsByChannel,
    });
}
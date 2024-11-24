import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { ChatEndPoint, ChatQueryKeys } from "./api-enums";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";

export const useFetchAllChatTags = (isEnabled = true) => {
    const { getData } = useServiceClient();

    const fetchAllTags = React.useCallback(() => getData(ChatEndPoint.FETCH_ALL_CHAT_TAGS).then((res) => res.json()), [getData]);

    return useQuery<IGenericResponse[], { message: string }>({
        queryKey: ChatQueryKeys.FETCH_ALL_CHAT_TAGS,
        queryFn: fetchAllTags,
        enabled: isEnabled
    })
}
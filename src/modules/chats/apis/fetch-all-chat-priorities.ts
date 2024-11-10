import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { ChatEndPoint, ChatQueryKeys } from "./api-enums";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";

export const useFetchAllChatPriorities = (isEnabled = true) => {
    const { getData } = useServiceClient();

    const fetchAllPriorities = React.useCallback(() => getData(ChatEndPoint.FETCH_ALL_CHAT_PRIORITIES).then((res) => res.json()), [getData]);

    return useQuery<IGenericResponse[], { message: string }>({
        queryKey: ChatQueryKeys.FETCH_ALL_CHAT_PRIORITIES,
        queryFn: fetchAllPriorities,
        enabled: isEnabled
    })
}
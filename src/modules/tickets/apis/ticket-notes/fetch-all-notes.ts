import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { TicketNotesEndPoint, TicketNotesQueryKey } from "./api-enums";
import { ToCamelCasedKeysFromUnderscores } from "lib/utils";

export interface Notes {
    id: number
    note: string
    user_name: string
    created_at: string
}

export type INotes = ToCamelCasedKeysFromUnderscores<Notes>;

export const useFetchAllNotes = (ticketId: number) => {
    const { getData } = useServiceClient();

    const fetchAllNotesData = React.useCallback(() => getData(`${TicketNotesEndPoint.FETCH_ALL_NOTES}?ticket_id=${ticketId}`).then((res) => res.json()).catch((err) => err), [ticketId, getData]);
    return useQuery<Notes[]>({
        queryKey: [TicketNotesQueryKey.FETCH_ALL_NOTES, ticketId],
        queryFn: fetchAllNotesData
    });
}
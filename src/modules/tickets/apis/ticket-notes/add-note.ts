import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketNotesEndPoint, TicketNotesQueryKey } from "./api-enums";

interface IAddNoteArgs {
    ticket_id: string;
    note: string;
}

export const useAddNote = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const addNote = useCallback((args: IAddNoteArgs) =>
        postData(`${TicketNotesEndPoint.ADD_NOTE}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketNotesQueryKey.ADD_NOTE],
        mutationFn: addNote,
        onSuccess: () => {
            queryClient.invalidateQueries(TicketNotesQueryKey.FETCH_ALL_NOTES);
        }
    });
}
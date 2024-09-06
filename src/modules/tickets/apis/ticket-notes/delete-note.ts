import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketNotesEndPoint, TicketNotesQueryKey } from "./api-enums";

interface IdeleteNoteArgs {
    note_id: string | number;
}

export const useDeleteNote = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteNote = useCallback((args: IdeleteNoteArgs) =>
        postData(`${TicketNotesEndPoint.DELETE_NOTE}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketNotesQueryKey.DELETE_NOTE],
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries(TicketNotesQueryKey.FETCH_ALL_NOTES);
        }
    });
}

export const useDeleteAllNotes = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteNote = useCallback((args: { ticket_id: string }) =>
        postData(`${TicketNotesEndPoint.DELETE_ALL_NOTES}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketNotesQueryKey.DELETE_ALL_NOTES],
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries(TicketNotesQueryKey.FETCH_ALL_NOTES);
        }
    });
}

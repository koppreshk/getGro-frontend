import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketNotesEndPoint, TicketNotesQueryKey } from './apis';

interface IEditNoteArgs {
  note_id: number;
  note: string;
}

export const useEditNote = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const addNote = useCallback(
    (args: IEditNoteArgs) =>
      postData(`${TicketNotesEndPoint.EDIT_NOTE}`, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketNotesQueryKey.EDIT_NOTE],
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries(TicketNotesQueryKey.FETCH_ALL_NOTES);
    },
  });
};

import { useServiceClient } from 'lib';
import { ToCamelCasedKeysFromUnderscores } from 'lib/utils';
import React from 'react';
import { useQuery } from 'react-query';

import { TicketNotesEndPoint, TicketNotesQueryKey } from './apis';

export interface Notes {
  id: number;
  note: string;
  user_name: string;
  created_at: string;
}

export type INotes = ToCamelCasedKeysFromUnderscores<Notes>;

export const useFetchAllNotes = (ticketId: number) => {
  const { getData } = useServiceClient();

  const fetchAllNotesData = React.useCallback(
    () =>
      getData(
        `${TicketNotesEndPoint.FETCH_ALL_NOTES}?ticket_id=${ticketId}`
      ).then((res) => res.json()),
    [ticketId, getData]
  );
  return useQuery<Notes[]>({
    queryKey: [TicketNotesQueryKey.FETCH_ALL_NOTES, ticketId],
    queryFn: fetchAllNotesData,
  });
};

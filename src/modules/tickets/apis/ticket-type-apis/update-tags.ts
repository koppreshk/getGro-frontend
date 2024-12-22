import { useServiceClient } from 'lib';
import { useGetQueryEndPoint } from 'modules/tickets/containers';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

interface IUpdateTagsArgs {
  ticket_id: number;
  tags: (number | string)[];
}

export const useUpdateTags = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();

  const updateTags = useCallback(
    (args: IUpdateTagsArgs) =>
      postData(TicketsEndPoint.UPDATE_TAGS, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.UPDATE_TAGS],
    mutationFn: updateTags,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

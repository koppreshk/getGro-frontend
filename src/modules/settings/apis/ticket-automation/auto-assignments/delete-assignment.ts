import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { AutoMationType } from '.';
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from './api-enums';

export const useDeleteAssignment = (automationType: AutoMationType) => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteAssignment = React.useCallback(
    (args: { id: number }) =>
      postData(
        `${AutoAssignmentEndPoint.DELETE_ASSIGNMENT}?id=${args.id}&automation_type=${automationType}`
      ).then((res) => res.json()),
    [automationType, postData]
  );

  return useMutation({
    mutationKey: [AutoAssignmentQueryKey.DELETE_ASSIGNMENT, automationType],
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries(
        AutoAssignmentQueryKey.FETCH_ALL_ASSIGNMENTS
      );
    },
  });
};

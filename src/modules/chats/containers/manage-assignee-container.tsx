import { CircularProgress } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { FlexBox, ManageAssignee } from 'lib/ui-ux';
import { useFetchAllTicketQueues } from 'modules/settings/apis';
import { IChangeAsigneeArgs } from 'modules/tickets/apis';

import { useUpdateChatAssignee } from '../apis';

export const ManageAssigneeContainer = () => {
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { data, isLoading } = useFetchAllTicketQueues();
  const { mutateAsync } = useUpdateChatAssignee(chatDetails!.id);

  const onChangeAssignee = (args: IChangeAsigneeArgs) => {
    return mutateAsync(args);
  };

  if (isLoading) {
    return (
      <FlexBox width="100%" justifyContent="center">
        <CircularProgress size={32} />
      </FlexBox>
    );
  }

  return (
    <>
      <ManageAssignee
        data={data!}
        assignedAgent={chatDetails?.assigned_agent}
        assignedQueue={chatDetails?.assigned_queue}
        onChangeAssignee={onChangeAssignee}
      />
    </>
  );
};

import { CircularProgress } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { FlexBox, ManageStatus } from 'lib/ui-ux';

import { useFetchAllChatStatuses, useUpdateChatStatus } from '../apis';

export const ChatStatusContainer = () => {
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { data, isLoading } = useFetchAllChatStatuses();
  const { mutateAsync } = useUpdateChatStatus();

  const onStatusChange = (statusId: number) => {
    return mutateAsync({
      statusId: statusId,
      conversationId: chatDetails!.id!,
    });
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
      <ManageStatus
        status={chatDetails?.status_id.toString() ?? ''}
        menuOptions={data!}
        onStatusChange={onStatusChange}
      />
    </>
  );
};

import { FlexBox } from 'lib/ui-ux';
import { ChatConversationLoader } from 'lib/ui-ux/loader-components';
import { useFetchCallsByTicketId } from 'modules/tickets/apis';
import { TelephonicConversationsLayout } from 'modules/tickets/components/ticket-details/ticket-conversation/telephonic-conversations';

export const TelephonicConversationContainer = () => {
  const { isLoading, data } = useFetchCallsByTicketId();

  if (isLoading) {
    return (
      <FlexBox width="100%" height="100%" flexDirection="column" padding="10px">
        <ChatConversationLoader />
      </FlexBox>
    );
  }

  return (
    <>
      <TelephonicConversationsLayout data={data!} />
    </>
  );
};

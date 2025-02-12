import { ErrorMessage, FlexBox } from 'lib/ui-ux';
import { ChatConversationLoader } from 'lib/ui-ux/loader-components';
import { useFetchCallsByTicketId } from 'modules/tickets/apis';
import { TelephonicConversationsLayout } from 'modules/tickets/components/ticket-details/ticket-conversation/telephonic-conversations';

export const TelephonicConversationContainer = () => {
  const { isLoading, data, error } = useFetchCallsByTicketId();

  if (isLoading) {
    return (
      <FlexBox width="100%" height="100%" flexDirection="column" padding="10px">
        <ChatConversationLoader />
      </FlexBox>
    );
  }

  if (data && Object.keys(data).length) {
    return (
      <>
        <TelephonicConversationsLayout data={data!} />
      </>
    );
  }

  return <ErrorMessage statusCode={error?.message ?? ''} />;
};

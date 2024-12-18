import { ErrorMessage, FlexBox } from 'lib/ui-ux';
import { EmailSkeletonLoader } from 'lib/ui-ux/loader-components';

import { useFetchEmailConversations } from '../../../apis';
import { EmailConversationLayout } from '../../../components/ticket-details/ticket-conversation/email-conversations/email-conversations-layout';

export const EmailConversationContainer = () => {
  const {
    data: conversationsData,
    isLoading: conversationLoading,
    isRefetching,
    error,
    refetch,
  } = useFetchEmailConversations();

  const fetchNewThreads = () => {
    refetch();
  };

  if (conversationLoading || isRefetching) {
    return (
      <FlexBox width="100%">
        <EmailSkeletonLoader />
      </FlexBox>
    );
  }

  if (conversationsData && conversationsData?.subject !== undefined) {
    return (
      <>
        <EmailConversationLayout
          conversationsData={conversationsData}
          fetchNewThreads={fetchNewThreads}
        />
      </>
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};

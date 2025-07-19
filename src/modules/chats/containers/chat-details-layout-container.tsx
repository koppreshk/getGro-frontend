import { CenteredCircularProgress } from 'lib/ui-ux';

import { ChatDetailsLayout } from '../components/chat-details';

export const ChatDetailsLayoutContainer = (props: { isLoading: boolean }) => {
  if (props.isLoading) {
    return <CenteredCircularProgress />;
  }
  return (
    <>
      <ChatDetailsLayout />
    </>
  );
};

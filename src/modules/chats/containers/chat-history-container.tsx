import { CenteredCircularProgress, ChatHistory, ErrorMessage } from 'lib/ui-ux';
import { useMatch } from 'react-router-dom';

import { useFetchChatHistory } from '../apis';

export const ChatHistoryContainer = () => {
  const match = useMatch('/chat/:conversationId');
  const id = match?.params.conversationId;

  const { data, isLoading, error } = useFetchChatHistory(id!);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data && id) {
    return <ChatHistory historyData={data} useTimeAgoDate />;
  }

  return <ErrorMessage statusCode={error?.message} />;
};

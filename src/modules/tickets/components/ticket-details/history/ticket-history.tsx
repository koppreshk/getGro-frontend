import { ChatHistory } from 'lib/ui-ux/common/chat-history';
import { TicketsHistory } from 'modules/tickets/apis';
import { styled } from 'styled-components';

const StyledChatHistory = styled(ChatHistory)`
  padding: 0;
`;

export const TicketHistory = (props: { data: TicketsHistory[] }) => {
  const { data } = props;

  return (
    <>
      <StyledChatHistory
        historyData={data.map((item) => ({
          created_at: item.createdAt,
          history: item.description,
          user: item.userName,
        }))}
        useTimeAgoDate
      />
    </>
  );
};

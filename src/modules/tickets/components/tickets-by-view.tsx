import { useNotifications } from 'lib';
import { useAppDispatch, useAppSelector } from 'lib/hooks';
import { SocketEventKeys, useSocket } from 'lib/providers/socket-provider';
import { TableControls } from 'lib/ui-ux';
import { saveAsCSV } from 'lib/utils';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { ITicketDetails } from '../apis';
import { DisplayTicketsGrid } from './display-tickets-grid';
import { TicketsCardview } from './tickets-card-view';
import { setTicketsList } from '../storage';

interface TicketsByViewProps {
  data: ITicketDetails[];
  isLoading?: boolean;
  totalPages: number;
  fetchAllTicketsWithSearchQuery?: (args?: Record<string, string>) => void;
}

const ContentContainer = styled.div`
  padding-top: 20px;
  background: ${({ theme }) => theme.pallete.grayVariant6};
  height: calc(100% - 76px);
  box-sizing: border-box;
`;

const StyledDataGrid = styled(DisplayTicketsGrid)`
  margin: 0 20px;
  width: calc(100% - 40px);
`;

export const useTicketsListSocket = () => {
  /**
   * This hook listens to the socket event for new tickets and new messages and sets the data in the redux store.
   */
  const { socket, getEventName } = useSocket();
  const { showNotification } = useNotifications();
  const ticketData = useAppSelector((state) => state.tickets.ticketsList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return; // Prevent running if socket is null

    socket?.on(
      getEventName(SocketEventKeys.EMAIL_LIST),
      (args: ITicketDetails[]) => {
        const clonedData = [...ticketData];
        const newOrModifiedTicket = args[0];

        // Find the index of the matching ticket
        const index = clonedData.findIndex(
          (ticket) => ticket.ticketId === newOrModifiedTicket.ticketId
        );

        if (index !== -1) {
          // Remove the matching ticket from its current position
          clonedData.splice(index, 1);

          // Add the matched ticket to the 0th index
          clonedData.unshift(newOrModifiedTicket);
          showNotification({
            message: `New message received for ticket id: ${newOrModifiedTicket.ticketId}`,
            type: 'info',
          });
        } else {
          // If not found, add the new ticket to the top
          clonedData.unshift(newOrModifiedTicket);
          showNotification({
            message: `New ticket received with ticket id: ${newOrModifiedTicket.ticketId}`,
            type: 'info',
          });
        }

        dispatch(setTicketsList(clonedData));
      }
    );

    return () => {
      socket.off(getEventName(SocketEventKeys.EMAIL_LIST));
    };
  }, [dispatch, getEventName, showNotification, socket, ticketData]);
};

export const TicketsByView = (props: TicketsByViewProps) => {
  const [searchParams] = useSearchParams();
  const cardView = searchParams.get('cardView') || 'true';
  const dispatch = useAppDispatch();
  const { data, ...rest } = props;

  useEffect(() => {
    if (props.data) {
      dispatch(setTicketsList(props.data));
    }
  }, [dispatch, props.data]);
  useTicketsListSocket();

  const onDownloadBtnClick = useCallback(() => {
    if (props.data) {
      saveAsCSV(props.data, { fileName: 'tickets' });
    }
  }, [props.data]);

  return (
    <>
      <div style={{ background: '#fff' }}>
        <TableControls
          totalPages={props.totalPages}
          enableSerchField
          isContentViewModeVisible
          onDownloadBtnClick={onDownloadBtnClick}
          fetchAllTicketsWithSearchQuery={props.fetchAllTicketsWithSearchQuery}
        />
      </div>
      <ContentContainer>
        {cardView === 'true' ? (
          <TicketsCardview {...rest} />
        ) : (
          <StyledDataGrid {...rest} />
        )}
      </ContentContainer>
    </>
  );
};

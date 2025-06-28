import { FlexBox } from 'lib/ui-ux';
import { TicketListViewLoader } from 'lib/ui-ux/loader-components';
import { useLocation } from 'react-router-dom';

import { useGetTicketsDataByKey } from '../apis';
import { TicketsEndPoint } from '../apis/api-enums';
import { TicketViewRoutes } from '../components';
import { TicketListView } from '../components/ticket-details/ticket-list-view';

export const useGetQueryEndPoint = () => {
  const location = useLocation();

  const getQueryEndPointByType = (): keyof typeof TicketsEndPoint => {
    switch (location.pathname.split('/')[2] || '') {
      case TicketViewRoutes.AllClosed:
        return 'FETCH_ALL_CLOSED_TICKETS';
      case TicketViewRoutes.AllPending:
        return 'FETCH_ALL_PENDING_TICKETS';
      case TicketViewRoutes.AllResolved:
        return 'FETCH_ALL_RESOLVED_TICKETS';
      case TicketViewRoutes.MyClosed:
        return 'FETCH_MY_CLOSED';
      case TicketViewRoutes.MyPending:
        return 'FETCH_MY_PENDING';
      case TicketViewRoutes.MyResolved:
        return 'FETCH_MY_RESOLVED';
      case TicketViewRoutes.DeletedTickets:
        return 'FETCH_DELETED_TICKETS';
      default:
        return 'FETCH_ALL_TICKETS';
    }
  };

  return getQueryEndPointByType();
};

export const TicketListViewContainer = () => {
  const queryEndPoint = useGetQueryEndPoint();
  const { data, isLoading, isRefetching } = useGetTicketsDataByKey(
    queryEndPoint,
    queryEndPoint
  );

  if (isLoading || isRefetching) {
    return (
      <FlexBox flexDirection="column" width="100%">
        <TicketListViewLoader />
      </FlexBox>
    );
  }

  if (data) {
    return <TicketListView data={data.data} />;
  }

  return <h6>error</h6>;
};

import { CircularProgress } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import {
  ITicketDetails,
  useChangePriority,
  useFetchPriorities,
} from 'modules/tickets/apis';
import { ManagePriority } from 'modules/tickets/components/ticket-details/ticket-details-section/ticket-overview';

interface IManagePriorityContainerProps
  extends Pick<ITicketDetails, 'priority' | 'ticketId'> {}

export const ManagePriorityContainer = (
  props: IManagePriorityContainerProps
) => {
  const { data, isLoading } = useFetchPriorities();
  const { mutateAsync } = useChangePriority(props.ticketId);

  const onChangePriority = (newPriority: number) => {
    return mutateAsync({
      priorityId: newPriority,
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
      <ManagePriority
        allPriorities={data!}
        priority={props.priority}
        onChangePriority={onChangePriority}
      />
    </>
  );
};

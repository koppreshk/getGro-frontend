import { CircularProgress } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useFetchAllTicketQueues } from 'modules/settings/apis';
import {
  IChangeAsigneeArgs,
  ITicketDetails,
  useChangeAsignee,
} from 'modules/tickets/apis';
import { ManageAssignee } from 'modules/tickets/components/ticket-details/ticket-details-section/ticket-overview';

interface IManageAssigneeContainerProps
  extends Pick<ITicketDetails, 'ticketId' | 'assigneeInfo'> {}

export const ManageAssigneeContainer = (
  props: IManageAssigneeContainerProps
) => {
  const { data, isLoading } = useFetchAllTicketQueues();
  const { mutateAsync } = useChangeAsignee(props.ticketId);

  const onChangeAssignee = (args: IChangeAsigneeArgs) => {
    return mutateAsync(args);
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
      <ManageAssignee
        data={data!}
        assigneeInfo={props.assigneeInfo}
        onChangeAssignee={onChangeAssignee}
      />
    </>
  );
};

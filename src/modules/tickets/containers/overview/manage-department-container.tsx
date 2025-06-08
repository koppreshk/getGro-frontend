import { CircularProgress } from '@mui/material';
import { useNotifications } from 'lib';
import { FlexBox } from 'lib/ui-ux';
import { useFetchAllDepartment } from 'modules/settings/apis/department';
import { ITicketDetails } from 'modules/tickets/apis';
import { useUpdateDepartment } from 'modules/tickets/apis/ticket-type-apis/update-department';
import { ManageDepartment } from 'modules/tickets/components/ticket-details/ticket-details-section/ticket-overview';

interface IManageDepartmentContainerProps
  extends Pick<ITicketDetails, 'ticketId' | 'departmentId'> {}

export const ManageDepartmentContainer = (
  props: IManageDepartmentContainerProps
) => {
  const { ticketId, departmentId } = props;
  const { data: allDepartment, isLoading: departmentLoading } =
    useFetchAllDepartment();
  const { mutateAsync } = useUpdateDepartment();
  const { showNotification } = useNotifications();

  const onDepartmentChange = (newDepartment: number | null) => {
    return mutateAsync({
      department_id: newDepartment,
      ticket_id: ticketId,
    }).then((res) => {
      if (!res.status) {
        showNotification({ message: res.message, type: 'error' });
      }
    });
  };

  if (departmentLoading) {
    return (
      <FlexBox width="100%" justifyContent="center">
        <CircularProgress size={32} />
      </FlexBox>
    );
  }

  if (allDepartment) {
    const associatedDepartment = allDepartment.filter(
      (item) => item.id === departmentId
    );

    return (
      <>
        <ManageDepartment
          associatedDepartment={associatedDepartment}
          allDepartment={allDepartment}
          onDepartmentChange={onDepartmentChange}
        />
      </>
    );
  }
  return null;
};

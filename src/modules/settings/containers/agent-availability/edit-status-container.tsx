import { AvailabilityStatuses } from 'modules/settings/apis/users-and-permissions';
import { AddNewStatusForm } from 'modules/settings/component/user-and-permissions/agent-availability/add-new status-form';
import React from 'react';

interface IEditUserContainerProps {
  onSelectRowMetaData: AvailabilityStatuses;
  toggleStatusDrawer: () => void;
}

export const EditStatusContainer = (props: IEditUserContainerProps) => {
  const { toggleStatusDrawer } = props;

  const onEditUser = React.useCallback(() => {
    toggleStatusDrawer();
  }, [toggleStatusDrawer]);

  return <AddNewStatusForm mode="edit" onFormSubmitHandler={onEditUser} />;
};

import { Switch } from '@mui/material';
import { useNotifications } from 'lib';
import { FlexBox } from 'lib/ui-ux';
import {
  AutoMationType,
  useSetAssignmentStatus,
} from 'modules/settings/apis/ticket-automation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AssignmentStatus = (props: {
  status: boolean;
  id: number;
  autoMationType: AutoMationType;
}) => {
  const { status, id, autoMationType } = props;
  const { mutateAsync } = useSetAssignmentStatus(autoMationType);
  const [currentStatus, setCurrentStatus] = useState(status);
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onChange = () => {
    setCurrentStatus((prevValue) => !prevValue);
    mutateAsync({ id: id }).catch(() => {
      setCurrentStatus((prevValue) => !prevValue);
      showNotification({ message: t('failed_perform_action'), type: 'error' });
    });
  };

  return (
    <FlexBox flexDirection="row" gap="5px" alignItems="center">
      {<Switch checked={currentStatus} onChange={onChange} />}
    </FlexBox>
  );
};

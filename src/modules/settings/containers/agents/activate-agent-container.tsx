import { CheckCircleOutline } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton } from 'lib/ui-ux';
import { useActivateUser } from 'modules/settings/apis/users-and-permissions';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ActivateAgentContainer = (props: { id: number | string }) => {
  const { mutateAsync } = useActivateUser();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onActivateHandler = React.useCallback(() => {
    mutateAsync({ id: props.id })
      .then(() =>
        showNotification({
          message: t('activate_user_success'),
          type: 'success',
        })
      )
      .catch(() =>
        showNotification({ message: t('activate_user_failure'), type: 'error' })
      );
  }, [mutateAsync, props.id, showNotification, t]);

  return (
    <CustomIconButton
      iconComponent={<CheckCircleOutline />}
      tooltipProps={{ title: t('activate') }}
      onClick={onActivateHandler}
    />
  );
};

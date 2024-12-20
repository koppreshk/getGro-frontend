import { RefreshOutlined } from '@mui/icons-material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

import { CustomIconButton } from './custom-icon-button';

export const RefreshButton = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const refreshPage = useCallback(async () => {
    await queryClient.refetchQueries({ active: true });
  }, [queryClient]);

  return (
    <>
      <CustomIconButton
        onClick={refreshPage}
        iconComponent={<RefreshOutlined />}
        tooltipProps={{ title: t('refresh') }}
      />
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNotifications } from 'lib';
import { CenteredCircularProgress } from 'lib/ui-ux';
import { useFetchGupshupConfiguration } from 'modules/settings/apis/marketplace/gupshup';
import { WhatsAppGupshupConfiguration } from 'modules/settings/component/apps/marketplace/gupshup';

export const GupShupConfigurationContainer = () => {
  const { data, error, isLoading, refetch } = useFetchGupshupConfiguration();
  const { showNotification } = useNotifications();

  const updateInstallation = () => {
    refetch().then(() => {
      showNotification({
        message: 'Congrats! GupShup configuration is added!',
        type: 'success',
      });
    });
  };

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <WhatsAppGupshupConfiguration
        data={data || {}}
        updateInstallation={updateInstallation}
      />
    );
  }

  return <span>Error: {error as any}</span>;
};

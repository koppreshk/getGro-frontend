import { useNotifications } from 'lib';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import { useFetchExotelConfiguration } from 'modules/settings/apis/marketplace/exotel';
import { ExotelConfiguration } from 'modules/settings/component/apps/marketplace/exotel-configuration';

export const ExotelConfigurationContainer = () => {
  const { data, isLoading, refetch, error } = useFetchExotelConfiguration();
  const { showNotification } = useNotifications();

  const updateInstallation = () => {
    refetch().then(() => {
      showNotification({
        message: 'Congrats! Exotel configuration is added!',
        type: 'success',
      });
    });
  };

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <ExotelConfiguration
        data={data || {}}
        updateInstallation={updateInstallation}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};

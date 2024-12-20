/* eslint-disable @typescript-eslint/no-explicit-any */

import { CenteredCircularProgress } from 'lib/ui-ux';
import { useFetchInstagramConfiguration } from 'modules/settings/apis/marketplace/instagram';
import { InstagramConfigurationLayout } from 'modules/settings/component/apps/marketplace/instagram';

export const InstagramConfigurationContainer = () => {
  const { data, error, isLoading } = useFetchInstagramConfiguration();

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return <InstagramConfigurationLayout data={data} />;
  }

  return <span>Error: {error as any}</span>;
};

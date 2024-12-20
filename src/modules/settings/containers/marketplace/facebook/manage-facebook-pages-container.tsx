import { useFetchConfiguredPages } from 'modules/settings/apis/marketplace/facebook';
import { ManageFacebookPagesLayout } from 'modules/settings/component/apps/marketplace/facebook';

export const ManageFacebookPagesContainer = () => {
  const { data, isLoading } = useFetchConfiguredPages();

  if (data || isLoading) {
    return <ManageFacebookPagesLayout data={data} isLoading={isLoading} />;
  }
};

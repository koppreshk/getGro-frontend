import { useFetchExotelAddedNumbers } from 'modules/settings/apis/marketplace/exotel';
import { ManageExotelNumbersLayout } from 'modules/settings/component/apps/marketplace/exotel-configuration/manage-exotel-numbers';

export const ManageExotelNumberContainer = () => {
  const { data, isLoading } = useFetchExotelAddedNumbers();

  if (data || isLoading) {
    return <ManageExotelNumbersLayout data={data} isLoading={isLoading} />;
  }
};

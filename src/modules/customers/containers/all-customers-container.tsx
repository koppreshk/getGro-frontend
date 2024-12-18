import { useFetchAllCustomers } from '../apis/fetch-all-customers';
import { AllCustomers } from '../components/all-customers';

export const AllCustomersContainer = () => {
  const { isLoading, data } = useFetchAllCustomers();

  return <AllCustomers data={data} isLoading={isLoading} />;
};

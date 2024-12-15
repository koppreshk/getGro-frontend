import { useFetchAllCustomers } from '../apis/fetch-all-customers';
import { AllCustomers } from '../components/all-customers';

export const AllCustomersContainer = () => {
  const { isLoading, data } = useFetchAllCustomers();

  console.log(data);
  return <AllCustomers data={data} isLoading={isLoading} />;
};

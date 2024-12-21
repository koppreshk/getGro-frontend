import { ErrorMessage } from 'lib/ui-ux';

import { useFetchAllCustomers } from '../apis/fetch-all-customers';
import { AllCustomers } from '../components/all-customers';

export const AllCustomersContainer = () => {
  const { isLoading, data, error } = useFetchAllCustomers();

  if (data || isLoading) {
    return (
      <AllCustomers
        data={data?.data}
        totalPages={data?.total_pages}
        isLoading={isLoading}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};

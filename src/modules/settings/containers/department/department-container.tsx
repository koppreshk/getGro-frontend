import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllDepartment } from 'modules/settings/apis/department';
import { DepartmentLayout } from 'modules/settings/component/ticket-configurations/department/department-layout';

export default function DepartmentContainer() {
  const { data, isLoading, error, isFetching } = useFetchAllDepartment();

  if (data || isLoading) {
    return <DepartmentLayout data={data} isLoading={isLoading || isFetching} />;
  }

  return <ErrorMessage statusCode={error?.message} />;
}

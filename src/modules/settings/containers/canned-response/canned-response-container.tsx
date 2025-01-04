import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllCannedResponses } from 'modules/settings/apis/canned-response';
import { CannedResponseLayout } from 'modules/settings/component/ticket-configurations/canned-response/canned-response-layout';

export default function CannedResponseContainer() {
  const { data, isLoading, error } = useFetchAllCannedResponses();

  if (data || isLoading) {
    return <CannedResponseLayout data={data} isLoading={isLoading} />;
  }
  return <ErrorMessage statusCode={error?.message} />;
}

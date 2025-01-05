import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllCannedResponses } from 'modules/settings/apis/canned-response';
import { InsertCannedResponse } from 'modules/tickets/components/ticket-details/ticket-conversation/email-conversations/insert-canned-response';

export const InsertCannedResponseContainer = (props: {
  editorType: string;
}) => {
  const { data, isLoading, error } = useFetchAllCannedResponses();

  if (data || isLoading) {
    return (
      <InsertCannedResponse
        data={data}
        isLoading={isLoading}
        editorType={props.editorType}
      />
    );
  }
  return <ErrorMessage statusCode={error?.message} />;
};

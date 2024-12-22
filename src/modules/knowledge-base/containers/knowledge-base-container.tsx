import { ErrorMessage } from 'lib/ui-ux';

import { useFetchAllKB } from '../apis';
import { KnowledgeBaseLayout } from '../components';

export const KnowledgeBaseContainer = () => {
  const { data, isLoading, error, isFetching } = useFetchAllKB();

  if (data || isLoading) {
    return (
      <KnowledgeBaseLayout
        knowledgeBaseData={data || []}
        isLoading={isLoading || isFetching}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};

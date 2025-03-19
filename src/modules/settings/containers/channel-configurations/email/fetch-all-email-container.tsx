import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllEmails } from 'modules/settings/apis';
import { AllEmails } from 'modules/settings/component/channel-configurations/email/all-emails';
import { useEffect } from 'react';

export const FetchAllEmailsContainer = (props: {
  toggleBtnStatus: (status: boolean) => void;
}) => {
  const { toggleBtnStatus } = props;
  const { data, isError, error, isLoading } = useFetchAllEmails();

  useEffect(() => {
    if (data && data.length > 0) {
      return toggleBtnStatus(true);
    }
    return toggleBtnStatus(false);
  }, [data, toggleBtnStatus]);

  if (isError) return <ErrorMessage statusCode={error?.message} />;

  return (
    <>
      <AllEmails data={data} isLoading={isLoading} />
    </>
  );
};

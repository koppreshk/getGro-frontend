import { ErrorMessage } from "lib/ui-ux"
import { useFetchAllEmails } from "modules/settings/apis"
import { AllEmails } from "modules/settings/component/channel-configurations/email/all-emails";

export const FetchAllEmailsContainer = () => {
    const { data, isError, error, isLoading } = useFetchAllEmails();

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            <AllEmails data={data} isLoading={isLoading} />
        </>
    )


}
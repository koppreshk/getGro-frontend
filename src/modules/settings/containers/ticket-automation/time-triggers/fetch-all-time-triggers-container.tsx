import { ErrorMessage } from "lib/ui-ux"
import { useFetchAllAssignments } from "modules/settings/apis/ticket-automation";
import { AllAssignments } from "modules/settings/component/ticket-automation/auto-assignments/all-assignments";

export const FetchAllTimeTriggersContainer = () => {
    const { data, isError, error, isLoading } = useFetchAllAssignments();

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            <AllAssignments data={data} isLoading={isLoading} />
        </>
    )
}
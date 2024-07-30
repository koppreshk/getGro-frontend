import { ErrorMessage } from "lib/ui-ux"
import { useFetchAllAssignments } from "modules/settings/apis/ticket-automation";
import { AllAssignments } from "modules/settings/component/ticket-automation/auto-assignments/all-assignments";

export const FetchAllUpdateTicketTriggersContainer = () => {
    const { data, isError, error, isLoading } = useFetchAllAssignments('update_trigger');

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            <AllAssignments data={data} isLoading={isLoading} />
        </>
    )
}
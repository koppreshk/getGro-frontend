import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllAssignments } from "modules/settings/apis/ticket-automation";
import { AllCreateTicketTriggers } from "modules/settings/component/ticket-automation/create-ticket-triggers";

export const FetchAllCreateTicketTriggersContainer = () => {
    const { data, isError, error, isLoading } = useFetchAllAssignments();

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            <AllCreateTicketTriggers data={data} isLoading={isLoading} />
        </>
    )
}